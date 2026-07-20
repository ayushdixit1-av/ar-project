const { runStage } = require("./blender-client");

const HELPER = `
import bpy, bmesh, math, random
from mathutils import Vector

def m(name, color, roughness=0.5, metallic=0.0):
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = color
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metallic
    return mat

def box(name, loc, dim, mat=None):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    o = bpy.context.active_object
    o.name = name
    o.scale = (dim[0]/2, dim[1]/2, dim[2]/2)
    bpy.ops.object.transform_apply(scale=True)
    if mat:
        o.data.materials.append(mat)
    return o

def cyl(name, loc, r, d, mat=None, seg=32):
    bpy.ops.mesh.primitive_cylinder_add(radius=r, depth=d, vertices=seg, location=loc)
    o = bpy.context.active_object
    o.name = name
    if mat:
        o.data.materials.append(mat)
    return o

def sph(name, loc, r, mat=None, seg=16):
    bpy.ops.mesh.primitive_uv_sphere_add(radius=r, segments=seg, ring_count=seg//2, location=loc)
    o = bpy.context.active_object
    o.name = name
    if mat:
        o.data.materials.append(mat)
    return o

def torus(name, loc, r1, r2, mat=None):
    bpy.ops.mesh.primitive_torus_add(major_radius=r1, minor_radius=r2, location=loc)
    o = bpy.context.active_object
    o.name = name
    if mat:
        o.data.materials.append(mat)
    return o

result = {}
`;

const STAGE1 = `
# STAGE 1: Clear scene + Room structure
${HELPER}

bpy.ops.wm.read_homefile(use_empty=True)
scene = bpy.context.scene
scene.render.engine = 'CYCLES'
scene.cycles.samples = 64
scene.render.resolution_x = 3840
scene.render.resolution_y = 2160

RW, RL, RH = 16.0, 12.0, 3.5

# Materials
mFloor = m("FloorWood", (0.45,0.30,0.18,1), 0.2)
mWall = m("WallWhite", (0.93,0.93,0.91,1), 0.85)
mPANEL = m("WoodPanel", (0.35,0.22,0.12,1), 0.35)
mCeil = m("Ceiling", (0.96,0.96,0.96,1), 0.9)
mGlass = m("Glass", (0.75,0.85,0.92,1), 0.02, specular=0.9)
mMBrsh = m("MBrsh", (0.72,0.72,0.74,1), 0.25, 0.9)
mMBlk = m("MBlk", (0.04,0.04,0.04,1), 0.55, 0.85)
mStl = m("Steel", (0.12,0.12,0.12,1), 0.35, 0.92)
mTWood = m("TableWood", (0.52,0.36,0.22,1), 0.28)
mPlW = m("PlW", (0.91,0.91,0.91,1), 0.6)
mPlG = m("PlG", (0.52,0.52,0.52,1), 0.65)
mPlBlk = m("PlBlk", (0.08,0.08,0.08,1), 0.6)
mLCD = m("LCD", (0.08,0.12,0.08,1), 0.08)
mLEDg = m("LEDg", (0.15,0.85,0.15,1), 0.3)
mLEDy = m("LEDy", (0.9,0.8,0.1,1), 0.3)
mLEDr = m("LEDr", (0.9,0.1,0.1,1), 0.3)
mLEDbl = m("LEDbl", (0.1,0.3,0.9,1), 0.3)
mScrn = m("Screen", (0.12,0.18,0.35,1), 0.08)
mRubber = m("Rubber", (0.15,0.15,0.15,1), 0.9)
mACRY = m("Acryl", (0.82,0.86,0.92,1), 0.08)
mRed = m("WireRed", (0.9,0.1,0.1,1), 0.7)
mBlue = m("WireBlue", (0.1,0.2,0.9,1), 0.7)
mYellow = m("WireYel", (0.95,0.85,0.1,1), 0.7)
mGreen = m("WireGrn", (0.1,0.8,0.15,1), 0.7)
mWhite = m("WireWht", (0.95,0.95,0.95,1), 0.7)
mCopper = m("Copper", (0.72,0.45,0.20,1), 0.3, 0.95)
mPCB = m("PCB", (0.05,0.35,0.15,1), 0.6)
mBreadboard = m("Breadboard", (0.95,0.93,0.85,1), 0.7)
mBlackPC = m("BlackPC", (0.03,0.03,0.03,1), 0.5, 0.2)

# Floor
box("Floor", (RW/2, RL/2, -0.05), (RW+0.4, RL+0.4, 0.1), mFloor)
# Ceiling
box("Ceiling", (RW/2, RL/2, RH+0.05), (RW+0.4, RL+0.4, 0.15), mCeil)
# Walls
box("WallBack", (RW/2, -0.12, RH/2), (RW+0.4, 0.24, RH), mWall)
box("WallFront", (RW/2, RL+0.12, RH/2), (RW+0.4, 0.24, RH), mWall)
box("WallLeft", (-0.12, RL/2, RH/2), (0.24, RL+0.4, RH), mWall)
box("WallRight", (RW+0.12, RL/2, RH/2), (0.24, RL+0.4, RH), mWall)

# Acoustic panels on back wall
for i in range(6):
    box(f"AcPnl_{i}", (1.5+i*2.5, 0.08, RH/2), (2.2, 0.06, 1.2), mPANEL)

# Windows on right wall
for i in range(3):
    wy = 2.0 + i * 4.0
    box(f"WinFrame_{i}", (RW+0.06, wy, 1.8), (0.15, 3.2, 0.12), mStl)
    box(f"WinGlass_{i}", (RW+0.06, wy, 1.8), (0.04, 3.0, 2.0), mGlass)
    box(f"WinSill_{i}", (RW+0.1, wy, 0.85), (0.25, 3.3, 0.06), mPlW)

# Door
box("DoorFrame", (7.5, RL+0.06, 1.25), (0.15, 1.3, 2.5), mPANEL)
box("DoorPanel", (7.5, RL+0.12, 1.25), (0.08, 1.05, 2.3), mPANEL)
box("DoorGlass", (7.5, RL+0.12, 1.7), (0.03, 0.55, 0.75), mGlass)
cyl("DoorHandle", (7.9, RL+0.18, 1.05), 0.018, 0.22, mMBrsh)

result["stage"] = "Room created"
result["objects"] = len(bpy.data.objects)
`;

const STAGE2 = `
# STAGE 2: Ceiling lights, fans, ACs, safety
${HELPER}

scene = bpy.context.scene
RW, RL, RH = 16.0, 12.0, 3.5
mCeilL = bpy.data.materials["Ceiling"] if "Ceiling" in bpy.data.materials else m("CeilL", (0.96,0.96,0.96,1), 0.9)
mMBrsh = bpy.data.materials["MBrsh"] if "MBrsh" in bpy.data.materials else m("MBrsh", (0.72,0.72,0.74,1), 0.25, 0.9)
mMBlk = bpy.data.materials["MBlk"] if "MBlk" in bpy.data.materials else m("MBlk", (0.04,0.04,0.04,1), 0.55, 0.85)
mPlW = bpy.data.materials["PlW"] if "PlW" in bpy.data.materials else m("PlW", (0.91,0.91,0.91,1), 0.6)
mStl = bpy.data.materials["Steel"] if "Steel" in bpy.data.materials else m("Steel", (0.12,0.12,0.12,1), 0.35, 0.92)
mRubber = bpy.data.materials["Rubber"] if "Rubber" in bpy.data.materials else m("Rubber", (0.15,0.15,0.15,1), 0.9)
mLEDg = bpy.data.materials["LEDg"] if "LEDg" in bpy.data.materials else m("LEDg", (0.15,0.85,0.15,1), 0.3)
mLEDr = bpy.data.materials["LEDr"] if "LEDr" in bpy.data.materials else m("LEDr", (0.9,0.1,0.1,1), 0.3)
mLCD = bpy.data.materials["LCD"] if "LCD" in bpy.data.materials else m("LCD", (0.08,0.12,0.08,1), 0.08)
mPlG = bpy.data.materials["PlG"] if "PlG" in bpy.data.materials else m("PlG", (0.52,0.52,0.52,1), 0.65)

# LED panel lights (4x2 grid)
for ix in range(4):
    for iy in range(2):
        lx = 2.0 + ix * 4.0
        ly = 2.0 + iy * 4.0
        box(f"LEDPanel_{ix}_{iy}", (lx, ly, RH-0.02), (1.5, 0.8, 0.04), mPlW)
        box(f"LEDGlow_{ix}_{iy}", (lx, ly, RH-0.06), (1.3, 0.6, 0.02), mLEDg)
        # Recessed frame
        box(f"LEDFrame_{ix}_{iy}", (lx, ly, RH-0.01), (1.6, 0.9, 0.02), mMBrsh)

# Spotlights above workstations (8 spots, 2 rows of 4)
for i in range(8):
    sx = 2.5 + (i % 4) * 3.8
    sy = 3.0 + (i // 4) * 6.0
    cyl(f"SpotMount_{i}", (sx, sy, RH-0.08), 0.04, 0.12, mMBrsh)
    cyl(f"SpotHead_{i}", (sx, sy, RH-0.25), 0.1, 0.18, mMBlk)
    sph(f"Bulb_{i}", (sx, sy, RH-0.38), 0.06, mLEDg)

# Ceiling fans (4)
for i in range(4):
    fx = 4.0 + (i % 2) * 8.0
    fy = 4.0 + (i // 2) * 4.0
    cyl(f"FanMotor_{i}", (fx, fy, RH-0.15), 0.18, 0.25, mMBrsh)
    cyl(f"FanRod_{i}", (fx, fy, RH-0.04), 0.025, 0.15, mMBrsh)
    # 5 blades
    for b in range(5):
        angle = b * (2 * math.pi / 5)
        bx = fx + math.cos(angle) * 0.55
        by = fy + math.sin(angle) * 0.55
        blade = box(f"FanBlade_{i}_{b}", (bx, by, RH-0.3), (0.18, 0.9, 0.015), mMBlk)
        blade.rotation_euler = (0, 0, angle)

# Split AC units (2 on left wall)
for i in range(2):
    ax = 3.0 + i * 10.0
    box(f"AC_{i}", (0.15, ax, 2.8), (0.3, 1.0, 0.35), mPlW)
    box(f"ACVent_{i}", (0.08, ax, 2.65), (0.08, 0.8, 0.06), mPlG)

# Fire extinguisher
cyl("FireExt", (0.8, 1.0, 0.6), 0.08, 1.0, mLEDr)
box("FireExtHandle", (0.8, 1.0, 1.2), (0.12, 0.06, 0.08), mMBlk)
box("FireExtLabel", (0.88, 1.0, 0.6), (0.01, 0.1, 0.4), mPlW)

# Emergency exit sign
box("ExitSign", (7.5, RL+0.08, 2.5), (0.12, 0.4, 0.2), mLEDg)
box("ExitSignFrame", (7.5, RL+0.08, 2.5), (0.15, 0.45, 0.25), mMBlk)

# CCTV cameras (4 corners)
for i, (cx, cy) in enumerate([(0.5,0.5),(RW-0.5,0.5),(0.5,RL-0.5),(RW-0.5,RL-0.5)]):
    box(f"CCTVMount_{i}", (cx, cy, RH-0.1), (0.08, 0.08, 0.15), mPlW)
    box(f"CCTVCam_{i}", (cx, cy, RH-0.25), (0.06, 0.12, 0.08), mMBlk)

# Wall clock
cyl("Clock", (RW/2, -0.05, 2.8), 0.2, 0.05, mPlW)
cyl("ClockRim", (RW/2, -0.05, 2.8), 0.22, 0.03, mMBrsh)

# Cable tray (along ceiling)
box("CableTray", (RW/2, 1.0, RH-0.15), (RW-1.0, 0.12, 0.08), mMBrsh)

result["stage"] = "Ceiling and safety equipment added"
result["objects"] = len(bpy.data.objects)
`;

const STAGE3 = `
# STAGE 3: 8 Workstations (tables + chairs)
${HELPER}

RW, RL, RH = 16.0, 12.0, 3.5
mTWood = bpy.data.materials["TableWood"] if "TableWood" in bpy.data.materials else m("TableWood", (0.52,0.36,0.22,1), 0.28)
mStl = bpy.data.materials["Steel"] if "Steel" in bpy.data.materials else m("Steel", (0.12,0.12,0.12,1), 0.35, 0.92)
mPlBlk = bpy.data.materials["PlBlk"] if "PlBlk" in bpy.data.materials else m("PlBlk", (0.08,0.08,0.08,1), 0.6)
mMBlk = bpy.data.materials["MBlk"] if "MBlk" in bpy.data.materials else m("MBlk", (0.04,0.04,0.04,1), 0.55, 0.85)
mPlG = bpy.data.materials["PlG"] if "PlG" in bpy.data.materials else m("PlG", (0.52,0.52,0.52,1), 0.65)
mMBrsh = bpy.data.materials["MBrsh"] if "MBrsh" in bpy.data.materials else m("MBrsh", (0.72,0.72,0.74,1), 0.25, 0.9)
mPANEL = bpy.data.materials["WoodPanel"] if "WoodPanel" in bpy.data.materials else m("WoodPanel", (0.35,0.22,0.12,1), 0.35)

positions = []
for row in range(2):
    for col in range(4):
        tx = 2.5 + col * 3.8
        ty = 3.0 + row * 6.0
        positions.append((tx, ty))

for idx, (tx, ty) in enumerate(positions):
    prefix = f"WS{idx}"

    # Table top (1.6m x 0.8m x 0.04m)
    box(f"{prefix}_TableTop", (tx, ty, 0.78), (1.6, 0.8, 0.04), mTWood)
    # Black steel frame legs (4 legs)
    for dx, dy in [(-0.72,-0.34),(0.72,-0.34),(-0.72,0.34),(0.72,0.34)]:
        cyl(f"{prefix}_Leg_{dx}_{dy}", (tx+dx, ty+dy, 0.39), 0.025, 0.78, mStl)
    # Cross bars
    box(f"{prefix}_XBar1", (tx, ty-0.34, 0.2), (1.44, 0.03, 0.03), mStl)
    box(f"{prefix}_XBar2", (tx, ty+0.34, 0.2), (1.44, 0.03, 0.03), mStl)
    box(f"{prefix}_YBar1", (tx-0.72, ty, 0.2), (0.03, 0.68, 0.03), mStl)
    box(f"{prefix}_YBar2", (tx+0.72, ty, 0.2), (0.03, 0.68, 0.03), mStl)
    # Cable management hole
    cyl(f"{prefix}_CableHole", (tx+0.4, ty, 0.76), 0.03, 0.06, mMBlk)
    # Under-table storage shelf
    box(f"{prefix}_Shelf", (tx, ty, 0.15), (1.3, 0.5, 0.02), mPlBlk)
    # Lockable drawers
    box(f"{prefix}_Drawer", (tx-0.6, ty, 0.55), (0.3, 0.45, 0.2), mPlG)
    box(f"{prefix}_DrawerKnob", (tx-0.6, ty+0.24, 0.55), (0.04, 0.02, 0.02), mMBrsh)
    # Footrest
    box(f"{prefix}_Footrest", (tx, ty, 0.05), (1.0, 0.3, 0.03), mStl)
    # Built-in electrical socket strip
    box(f"{prefix}_SocketStrip", (tx-0.7, ty, 0.76), (0.3, 0.06, 0.04), mPlW)
    # USB ports (small colored indicators)
    box(f"{prefix}_USB1", (tx-0.78, ty, 0.76), (0.02, 0.02, 0.015), mLEDg)
    box(f"{prefix}_USB2", (tx-0.72, ty, 0.76), (0.02, 0.02, 0.015), mLEDg)
    # LAN port indicators
    box(f"{prefix}_LAN1", (tx-0.66, ty, 0.76), (0.02, 0.02, 0.015), mMBrsh)
    box(f"{prefix}_LAN2", (tx-0.60, ty, 0.76), (0.02, 0.02, 0.015), mMBrsh)

    # Ergonomic chair (simplified)
    box(f"{prefix}_ChairSeat", (tx, ty+0.55, 0.45), (0.45, 0.45, 0.06), mMBlk)
    box(f"{prefix}_ChairBack", (tx, ty+0.78, 0.7), (0.42, 0.04, 0.5), mMBlk)
    cyl(f"{prefix}_ChairPed", (tx, ty+0.55, 0.22), 0.03, 0.22, mStl)
    cyl(f"{prefix}_ChairBase", (tx, ty+0.55, 0.04), 0.25, 0.04, mStl)
    # 5 casters
    for c in range(5):
        ca = c * (2*math.pi/5)
        cx = tx + 0.55*math.cos(ca)
        cy = ty + 0.55 + 0.55*math.sin(ca)
        sph(f"{prefix}_Caster_{c}", (cx, cy, 0.04), 0.03, mMBlk)

result["stage"] = "8 workstations with chairs created"
result["objects"] = len(bpy.data.objects)
`;

const STAGE4 = `
# STAGE 4: Equipment on workstations - Part 1 (Trainer kits, breadboards)
${HELPER}

RW, RL, RH = 16.0, 12.0, 3.5
mPlW = bpy.data.materials["PlW"] if "PlW" in bpy.data.materials else m("PlW", (0.91,0.91,0.91,1), 0.6)
mPlG = bpy.data.materials["PlG"] if "PlG" in bpy.data.materials else m("PlG", (0.52,0.52,0.52,1), 0.65)
mPlBlk = bpy.data.materials["PlBlk"] if "PlBlk" in bpy.data.materials else m("PlBlk", (0.08,0.08,0.08,1), 0.6)
mMBlk = bpy.data.materials["MBlk"] if "MBlk" in bpy.data.materials else m("MBlk", (0.04,0.04,0.04,1), 0.55, 0.85)
mMBrsh = bpy.data.materials["MBrsh"] if "MBrsh" in bpy.data.materials else m("MBrsh", (0.72,0.72,0.74,1), 0.25, 0.9)
mStl = bpy.data.materials["Steel"] if "Steel" in bpy.data.materials else m("Steel", (0.12,0.12,0.12,1), 0.35, 0.92)
mBreadboard = bpy.data.materials["Breadboard"] if "Breadboard" in bpy.data.materials else m("Breadboard", (0.95,0.93,0.85,1), 0.7)
mLEDg = bpy.data.materials["LEDg"] if "LEDg" in bpy.data.materials else m("LEDg", (0.15,0.85,0.15,1), 0.3)
mLEDr = bpy.data.materials["LEDr"] if "LEDr" in bpy.data.materials else m("LEDr", (0.9,0.1,0.1,1), 0.3)
mLEDy = bpy.data.materials["LEDy"] if "LEDy" in bpy.data.materials else m("LEDy", (0.9,0.8,0.1,1), 0.3)
mLEDbl = bpy.data.materials["LEDbl"] if "LEDbl" in bpy.data.materials else m("LEDbl", (0.1,0.3,0.9,1), 0.3)
mPCB = bpy.data.materials["PCB"] if "PCB" in bpy.data.materials else m("PCB", (0.05,0.35,0.15,1), 0.6)
mRed = bpy.data.materials["WireRed"] if "WireRed" in bpy.data.materials else m("WireRed", (0.9,0.1,0.1,1), 0.7)
mBlue = bpy.data.materials["WireBlue"] if "WireBlue" in bpy.data.materials else m("WireBlue", (0.1,0.2,0.9,1), 0.7)
mYellow = bpy.data.materials["WireYel"] if "WireYel" in bpy.data.materials else m("WireYel", (0.95,0.85,0.1,1), 0.7)
mGreen = bpy.data.materials["WireGrn"] if "WireGrn" in bpy.data.materials else m("WireGrn", (0.1,0.8,0.15,1), 0.7)
mBlackPC = bpy.data.materials["BlackPC"] if "BlackPC" in bpy.data.materials else m("BlackPC", (0.03,0.03,0.03,1), 0.5, 0.2)
mLCD = bpy.data.materials["LCD"] if "LCD" in bpy.data.materials else m("LCD", (0.08,0.12,0.08,1), 0.08)

positions = []
for row in range(2):
    for col in range(4):
        tx = 2.5 + col * 3.8
        ty = 3.0 + row * 6.0
        positions.append((tx, ty))

for idx, (tx, ty) in enumerate(positions):
    P = f"W{idx}"

    # Digital Logic Trainer Kit (large box ~40x30x5cm on left side of table)
    bx, by = tx - 0.45, ty - 0.15
    box(f"{P}_TrainerBase", (bx, by, 0.83), (0.4, 0.3, 0.05), mPlG)
    # Control panel area (dark)
    box(f"{P}_TrainerPanel", (bx, by, 0.86), (0.38, 0.28, 0.01), mPlBlk)
    # Switch inputs row (8 tiny switches)
    for s in range(8):
        sx = bx - 0.14 + s * 0.04
        box(f"{P}_Switch_{s}", (sx, by-0.08, 0.875), (0.015, 0.02, 0.02), mPlW)
        # LED indicator above each switch
        led_m = [mLEDg, mLEDr, mLEDg, mLEDy, mLEDg, mLEDbl, mLEDr, mLEDg][s]
        box(f"{P}_SwLED_{s}", (sx, by-0.08, 0.89), (0.01, 0.01, 0.008), led_m)
    # 7-segment display area
    box(f"{P}_SevenSeg", (bx+0.08, by-0.08, 0.875), (0.1, 0.04, 0.015), mPlBlk)
    # LED indicators row
    for l in range(8):
        lx = bx - 0.12 + l * 0.035
        lm = [mLEDg, mLEDr, mLEDy, mLEDg, mLEDbl, mLEDg, mLEDr, mLEDy][l]
        box(f"{P}_IndLED_{l}", (lx, by+0.08, 0.875), (0.012, 0.012, 0.008), lm)
    # Clock generator knob
    cyl(f"{P}_ClockKnob", (bx+0.15, by+0.1, 0.88), 0.015, 0.02, mMBrsh)
    # IC socket area (grid of sockets)
    for ix in range(3):
        for iy in range(2):
            box(f"{P}_ICSocket_{ix}_{iy}", (bx-0.12+ix*0.08, by+0.02+iy*0.06, 0.87), (0.04, 0.03, 0.008), mPlBlk)
    # Push buttons (red, blue, yellow)
    sph(f"{P}_PBtn_R", (bx+0.18, by-0.05, 0.88), 0.012, mLEDr)
    sph(f"{P}_PBtn_B", (bx+0.22, by-0.05, 0.88), 0.012, mLEDbl)
    sph(f"{P}_PBtn_Y", (bx+0.26, by-0.05, 0.88), 0.012, mLEDy)
    # Buzzer
    cyl(f"{P}_Buzzer", (bx+0.16, by+0.12, 0.88), 0.018, 0.015, mPlBlk)
    # Power indicator
    box(f"{P}_PwrInd", (bx-0.16, by+0.12, 0.875), (0.02, 0.01, 0.008), mLEDr)

    # Large breadboard (on table, right of trainer)
    bx2, by2 = tx + 0.1, ty - 0.15
    box(f"{P}_Breadboard", (bx2, by2, 0.81), (0.28, 0.14, 0.012), mBreadboard)
    # Jumper wires on breadboard
    for w in range(8):
        wm = [mRed, mBlue, mYellow, mGreen, mRed, mBlue, mGreen, mYellow][w]
        wx = bx2 - 0.1 + w * 0.03
        wy_off = (w % 3) * 0.03 - 0.03
        box(f"{P}_JWire_{w}", (wx, by2+wy_off, 0.82), (0.005, 0.06, 0.005), wm)

    # Assembled circuit on breadboard (small IC chip + wires)
    box(f"{P}_CircuitIC", (bx2+0.02, by2, 0.825), (0.04, 0.015, 0.008), mPlBlk)
    for cw in range(5):
        cm = [mRed, mBlue, mGreen, mYellow, mRed][cw]
        cx = bx2 - 0.08 + cw * 0.04
        box(f"{P}_CWire_{cw}", (cx, by2+0.04, 0.82), (0.004, 0.08, 0.004), cm)

result["stage"] = "Trainer kits and breadboards added"
result["objects"] = len(bpy.data.objects)
`;

const STAGE5 = `
# STAGE 5: Equipment Part 2 (Power supply, multimeter, oscilloscope, function gen)
${HELPER}

mPlW = bpy.data.materials["PlW"] if "PlW" in bpy.data.materials else m("PlW", (0.91,0.91,0.91,1), 0.6)
mPlG = bpy.data.materials["PlG"] if "PlG" in bpy.data.materials else m("PlG", (0.52,0.52,0.52,1), 0.65)
mPlBlk = bpy.data.materials["PlBlk"] if "PlBlk" in bpy.data.materials else m("PlBlk", (0.08,0.08,0.08,1), 0.6)
mMBlk = bpy.data.materials["MBlk"] if "MBlk" in bpy.data.materials else m("MBlk", (0.04,0.04,0.04,1), 0.55, 0.85)
mMBrsh = bpy.data.materials["MBrsh"] if "MBrsh" in bpy.data.materials else m("MBrsh", (0.72,0.72,0.74,1), 0.25, 0.9)
mStl = bpy.data.materials["Steel"] if "Steel" in bpy.data.materials else m("Steel", (0.12,0.12,0.12,1), 0.35, 0.92)
mLEDg = bpy.data.materials["LEDg"] if "LEDg" in bpy.data.materials else m("LEDg", (0.15,0.85,0.15,1), 0.3)
mLEDr = bpy.data.materials["LEDr"] if "LEDr" in bpy.data.materials else m("LEDr", (0.9,0.1,0.1,1), 0.3)
mLCD = bpy.data.materials["LCD"] if "LCD" in bpy.data.materials else m("LCD", (0.08,0.12,0.08,1), 0.08)
mScrn = bpy.data.materials["Screen"] if "Screen" in bpy.data.materials else m("Screen", (0.12,0.18,0.35,1), 0.08)
mCopper = bpy.data.materials["Copper"] if "Copper" in bpy.data.materials else m("Copper", (0.72,0.45,0.20,1), 0.3, 0.95)
mRed = bpy.data.materials["WireRed"] if "WireRed" in bpy.data.materials else m("WireRed", (0.9,0.1,0.1,1), 0.7)
mBlue = bpy.data.materials["WireBlue"] if "WireBlue" in bpy.data.materials else m("WireBlue", (0.1,0.2,0.9,1), 0.7)

positions = []
for row in range(2):
    for col in range(4):
        tx = 2.5 + col * 3.8
        ty = 3.0 + row * 6.0
        positions.append((tx, ty))

for idx, (tx, ty) in enumerate(positions):
    P = f"W{idx}"

    # DC Power Supply (right side, back)
    px, py = tx + 0.5, ty + 0.25
    box(f"{P}_PSU", (px, py, 0.85), (0.15, 0.22, 0.08), mPlG)
    # Voltage display
    box(f"{P}_PSUDispV", (px-0.04, py, 0.895), (0.04, 0.06, 0.015), mPlBlk)
    box(f"{P}_PSUDispI", (px+0.04, py, 0.895), (0.04, 0.06, 0.015), mPlBlk)
    # Knobs
    cyl(f"{P}_PSUKnob1", (px-0.04, py-0.08, 0.90), 0.012, 0.015, mMBrsh)
    cyl(f"{P}_PSUKnob2", (px+0.04, py-0.08, 0.90), 0.012, 0.015, mMBrsh)
    # Banana terminals (+ -)
    cyl(f"{P}_PSUTermR", (px-0.05, py+0.08, 0.895), 0.01, 0.02, mLEDr)
    cyl(f"{P}_PSUTermB", (px+0.05, py+0.08, 0.895), 0.01, 0.02, mLEDbl if "WireBlue" in bpy.data.materials else mBlue)
    # Power switch & vent
    box(f"{P}_PSUSwitch", (px, py+0.1, 0.895), (0.03, 0.01, 0.01), mPlW)
    for v in range(4):
        box(f"{P}_PSUVent_{v}", (px, py-0.06+v*0.03, 0.835), (0.12, 0.005, 0.02), mPlBlk)

    # Digital Multimeter (front right)
    mx, my = tx + 0.55, ty - 0.15
    box(f"{P}_DMM", (mx, my, 0.82), (0.1, 0.16, 0.03), mPlW)
    box(f"{P}_DMMScreen", (mx, my+0.03, 0.84), (0.06, 0.05, 0.005), mLCD)
    cyl(f"{P}_DMMKnob", (mx, my-0.03, 0.84), 0.018, 0.01, mMBrsh)
    # Probe leads
    cyl(f"{P}_DMMProbeR", (mx+0.04, my-0.06, 0.82), 0.004, 0.15, mRed)
    cyl(f"{P}_DMMProbeB", (mx-0.04, my-0.06, 0.82), 0.004, 0.15, mBlue)

    # Hookup wire bundle (small organized set)
    wx, wy = tx + 0.35, ty - 0.25
    wire_mats = [mRed, mBlue, bpy.data.materials["WireYel"], bpy.data.materials["WireGrn"], bpy.data.materials["WireWht"], bpy.data.materials["WireBlue"]]
    for wi, wm in enumerate(wire_mats):
        wa = wi * 0.3
        wr = 0.01
        cyl(f"{P}_HookWire_{wi}", (wx+math.cos(wa)*0.03, wy+math.sin(wa)*0.03, 0.815), wr, 0.08, wm)

    # IC Collection box
    ix, iy = tx + 0.35, ty + 0.15
    box(f"{P}_ICBox", (ix, iy, 0.82), (0.1, 0.08, 0.02), mPlW)
    # Small ICs inside
    ic_names = ["7400","7402","7404","7408","7432","7411","74151","7486"]
    for ic_i, icn in enumerate(ic_names):
        icx = ix - 0.03 + (ic_i % 4) * 0.02
        icy = iy - 0.02 + (ic_i // 4) * 0.02
        box(f"{P}_IC_{icn}", (icx, icy, 0.835), (0.015, 0.008, 0.005), mMBlk)
        # Silver pins
        for pin in range(4):
            box(f"{P}_ICPin_{icn}_{pin}", (icx-0.005+pin*0.004, icy, 0.83), (0.002, 0.012, 0.002), mMBrsh)

    # Patch cords
    px2, py2 = tx + 0.5, ty - 0.2
    for pc in range(6):
        pcm = [mRed, mBlue, bpy.data.materials["WireYel"], bpy.data.materials["WireGrn"], mRed, mBlue][pc]
        pa = pc * 1.0
        cyl(f"{P}_Patch_{pc}", (px2+math.cos(pa)*0.04, py2+math.sin(pa)*0.04, 0.815), 0.003, 0.12, pcm)

result["stage"] = "Power supplies, multimeters, wires, IC boxes added"
result["objects"] = len(bpy.data.objects)
`;

const STAGE6 = `
# STAGE 6: Equipment Part 3 (Oscilloscope, Function Gen, Logic Analyzer, Computer)
${HELPER}

mPlW = bpy.data.materials["PlW"] if "PlW" in bpy.data.materials else m("PlW", (0.91,0.91,0.91,1), 0.6)
mPlG = bpy.data.materials["PlG"] if "PlG" in bpy.data.materials else m("PlG", (0.52,0.52,0.52,1), 0.65)
mPlBlk = bpy.data.materials["PlBlk"] if "PlBlk" in bpy.data.materials else m("PlBlk", (0.08,0.08,0.08,1), 0.6)
mMBlk = bpy.data.materials["MBlk"] if "MBlk" in bpy.data.materials else m("MBlk", (0.04,0.04,0.04,1), 0.55, 0.85)
mMBrsh = bpy.data.materials["MBrsh"] if "MBrsh" in bpy.data.materials else m("MBrsh", (0.72,0.72,0.74,1), 0.25, 0.9)
mStl = bpy.data.materials["Steel"] if "Steel" in bpy.data.materials else m("Steel", (0.12,0.12,0.12,1), 0.35, 0.92)
mLEDg = bpy.data.materials["LEDg"] if "LEDg" in bpy.data.materials else m("LEDg", (0.15,0.85,0.15,1), 0.3)
mScrn = bpy.data.materials["Screen"] if "Screen" in bpy.data.materials else m("Screen", (0.12,0.18,0.35,1), 0.08)
mRed = bpy.data.materials["WireRed"] if "WireRed" in bpy.data.materials else m("WireRed", (0.9,0.1,0.1,1), 0.7)
mBlue = bpy.data.materials["WireBlue"] if "WireBlue" in bpy.data.materials else m("WireBlue", (0.1,0.2,0.9,1), 0.7)
mBlackPC = bpy.data.materials["BlackPC"] if "BlackPC" in bpy.data.materials else m("BlackPC", (0.03,0.03,0.03,1), 0.5, 0.2)
mLCD = bpy.data.materials["LCD"] if "LCD" in bpy.data.materials else m("LCD", (0.08,0.12,0.08,1), 0.08)

positions = []
for row in range(2):
    for col in range(4):
        tx = 2.5 + col * 3.8
        ty = 3.0 + row * 6.0
        positions.append((tx, ty))

for idx, (tx, ty) in enumerate(positions):
    P = f"W{idx}"

    # Digital Oscilloscope (center-right back)
    ox, oy = tx + 0.25, ty + 0.28
    box(f"{P}_Scope", (ox, oy, 0.87), (0.22, 0.2, 0.12), mPlG)
    # Large LCD display
    box(f"{P}_ScopeScreen", (ox, oy+0.06, 0.92), (0.16, 0.01, 0.09), mScrn)
    # Waveform line on screen (green sine wave approximation)
    for w in range(10):
        wave_x = ox - 0.06 + w * 0.014
        wave_y = oy + 0.065
        wave_z = 0.915 + math.sin(w * 0.8) * 0.02
        box(f"{P}_Wave_{w}", (wave_x, wave_y, wave_z), (0.01, 0.005, 0.005), mLEDg)
    # Function buttons row
    for b in range(6):
        box(f"{P}_ScopeBtn_{b}", (ox-0.08+b*0.03, oy-0.06, 0.93), (0.02, 0.015, 0.01), mPlW)
    # Rotary knobs
    for k in range(3):
        cyl(f"{P}_ScopeKnob_{k}", (ox+0.06, oy-0.04+k*0.04, 0.93), 0.012, 0.015, mMBrsh)
    # BNC connectors (4 channels)
    for ch in range(4):
        cyl(f"{P}_BNC_{ch}", (ox-0.08+ch*0.04, oy-0.1, 0.88), 0.008, 0.02, mMBrsh)

    # Function Generator (next to scope)
    fgx, fgy = tx + 0.55, ty + 0.28
    box(f"{P}_FuncGen", (fgx, fgy, 0.85), (0.14, 0.16, 0.08), mPlG)
    box(f"{P}_FuncGenScr", (fgx, fgy+0.04, 0.895), (0.08, 0.01, 0.04), mLCD)
    cyl(f"{P}_FuncKnob1", (fgx-0.04, fgy-0.04, 0.90), 0.01, 0.012, mMBrsh)
    cyl(f"{P}_FuncKnob2", (fgx+0.04, fgy-0.04, 0.90), 0.01, 0.012, mMBrsh)
    box(f"{P}_FuncBtn1", (fgx-0.03, fgy-0.06, 0.90), (0.015, 0.01, 0.008), mPlW)
    box(f"{P}_FuncBtn2", (fgx+0.03, fgy-0.06, 0.90), (0.015, 0.01, 0.008), mPlW)
    cyl(f"{P}_FuncOutput", (fgx, fgy+0.08, 0.89), 0.008, 0.02, mMBrsh)

    # USB Logic Analyzer (small device)
    lax, lay = tx + 0.6, ty + 0.05
    box(f"{P}_LogicAnalyzer", (lax, lay, 0.82), (0.08, 0.04, 0.015), mPlBlk)
    box(f"{P}_LAUSB", (lax+0.045, lay, 0.82), (0.01, 0.02, 0.01), mMBrsh)
    # Probe wires
    for pw in range(8):
        pwm = [mRed, mBlue, mRed, mBlue, mRed, mBlue, mRed, mBlue][pw]
        cyl(f"{P}_LAProbe_{pw}", (lax-0.03+pw*0.008, lay-0.02, 0.81), 0.002, 0.08, pwm)

    # Desktop Computer (monitor + CPU + keyboard + mouse)
    cx, cy = tx, ty + 0.25
    # Monitor
    box(f"{P}_Monitor", (cx, cy, 0.95), (0.42, 0.02, 0.26), mPlBlk)
    box(f"{P}_MonScreen", (cx, cy+0.012, 0.95), (0.38, 0.005, 0.22), mScrn)
    cyl(f"{P}_MonStand", (cx, cy-0.05, 0.83), 0.02, 0.12, mMBrsh)
    box(f"{P}_MonBase", (cx, cy-0.05, 0.80), (0.15, 0.1, 0.01), mPlBlk)
    # Keyboard
    box(f"{P}_Keyboard", (cx, cy-0.2, 0.815), (0.35, 0.12, 0.015), mPlG)
    for krow in range(3):
        for kcol in range(10):
            box(f"{P}_Key_{krow}_{kcol}", (cx-0.14+kcol*0.03, cy-0.24+krow*0.03, 0.825), (0.02, 0.02, 0.005), mPlBlk)
    # Mouse
    box(f"{P}_Mouse", (cx+0.25, cy-0.2, 0.815), (0.04, 0.07, 0.02), mPlBlk)
    # Mini CPU cabinet
    box(f"{P}_CPU", (cx+0.35, cy-0.1, 0.86), (0.12, 0.18, 0.28), mPlBlk)
    box(f"{P}_CPUPanel", (cx+0.35, cy-0.01, 0.86), (0.1, 0.005, 0.24), mPlG)
    box(f"{P}_CPUUSB", (cx+0.35, cy-0.005, 0.82), (0.03, 0.005, 0.01), mMBrsh)
    cyl(f"{P}_CPUPower", (cx+0.35, cy-0.005, 0.97), 0.008, 0.005, mLEDg)

    # Scientific calculator (small)
    box(f"{P}_Calc", (cx-0.25, cy-0.15, 0.815), (0.06, 0.1, 0.01), mPlBlk)
    box(f"{P}_CalcScr", (cx-0.25, cy-0.15, 0.822), (0.04, 0.03, 0.003), mLCD)

    # Engineering notebook
    box(f"{P}_Notebook", (cx-0.2, cy-0.1, 0.81), (0.12, 0.16, 0.01), mPlW)
    box(f"{P}_NotebookLine1", (cx-0.2, cy-0.1, 0.816), (0.1, 0.002, 0.001), mBlue)
    box(f"{P}_NotebookLine2", (cx-0.2, cy-0.08, 0.816), (0.1, 0.002, 0.001), mBlue)

    # Pens
    cyl(f"{P}_Pen1", (cx-0.3, cy-0.08, 0.815), 0.004, 0.12, mPlBlk)
    cyl(f"{P}_Pen2", (cx-0.32, cy-0.08, 0.815), 0.004, 0.12, mBlue)

result["stage"] = "Oscilloscopes, function generators, computers added"
result["objects"] = len(bpy.data.objects)
`;

const STAGE7 = `
# STAGE 7: Instructor Station
${HELPER}

mTWood = bpy.data.materials["TableWood"] if "TableWood" in bpy.data.materials else m("TableWood", (0.52,0.36,0.22,1), 0.28)
mStl = bpy.data.materials["Steel"] if "Steel" in bpy.data.materials else m("Steel", (0.12,0.12,0.12,1), 0.35, 0.92)
mPlG = bpy.data.materials["PlG"] if "PlG" in bpy.data.materials else m("PlG", (0.52,0.52,0.52,1), 0.65)
mPlBlk = bpy.data.materials["PlBlk"] if "PlBlk" in bpy.data.materials else m("PlBlk", (0.08,0.08,0.08,1), 0.6)
mMBlk = bpy.data.materials["MBlk"] if "MBlk" in bpy.data.materials else m("MBlk", (0.04,0.04,0.04,1), 0.55, 0.85)
mMBrsh = bpy.data.materials["MBrsh"] if "MBrsh" in bpy.data.materials else m("MBrsh", (0.72,0.72,0.74,1), 0.25, 0.9)
mPlW = bpy.data.materials["PlW"] if "PlW" in bpy.data.materials else m("PlW", (0.91,0.91,0.91,1), 0.6)
mLEDg = bpy.data.materials["LEDg"] if "LEDg" in bpy.data.materials else m("LEDg", (0.15,0.85,0.15,1), 0.3)
mScrn = bpy.data.materials["Screen"] if "Screen" in bpy.data.materials else m("Screen", (0.12,0.18,0.35,1), 0.08)
mRed = bpy.data.materials["WireRed"] if "WireRed" in bpy.data.materials else m("WireRed", (0.9,0.1,0.1,1), 0.7)
mBlue = bpy.data.materials["WireBlue"] if "WireBlue" in bpy.data.materials else m("WireBlue", (0.1,0.2,0.9,1), 0.7)
mPANEL = bpy.data.materials["WoodPanel"] if "WoodPanel" in bpy.data.materials else m("WoodPanel", (0.35,0.22,0.12,1), 0.35)
mLEDr = bpy.data.materials["LEDr"] if "LEDr" in bpy.data.materials else m("LEDr", (0.9,0.1,0.1,1), 0.3)
mBlackPC = bpy.data.materials["BlackPC"] if "BlackPC" in bpy.data.materials else m("BlackPC", (0.03,0.03,0.03,1), 0.5, 0.2)

# Large instructor desk (2.0m x 1.0m)
ix, iy = 8.0, 10.5
box("InstructorDesk", (ix, iy, 0.78), (2.0, 1.0, 0.05), mTWood)
for dx, dy in [(-0.9,-0.45),(0.9,-0.45),(-0.9,0.45),(0.9,0.45)]:
    cyl(f"InstLeg_{dx}_{dy}", (ix+dx, iy+dy, 0.39), 0.03, 0.78, mStl)
# Pedestal storage
box("InstPedestal", (ix+0.7, iy, 0.45), (0.5, 0.6, 0.65), mPANEL)
box("InstPedDrawer1", (ix+0.7, iy, 0.35), (0.45, 0.01, 0.15), mPlG)
box("InstPedDrawer2", (ix+0.7, iy, 0.5), (0.45, 0.01, 0.15), mPlG)
cyl("InstPedKnob1", (ix+0.7, iy+0.01, 0.35), 0.008, 0.01, mMBrsh)
cyl("InstPedKnob2", (ix+0.7, iy+0.01, 0.5), 0.008, 0.01, mMBrsh)

# High-end oscilloscope on instructor desk
box("InstScope", (ix-0.5, iy, 0.88), (0.25, 0.22, 0.14), mPlG)
box("InstScopeScr", (ix-0.5, iy+0.07, 0.94), (0.18, 0.01, 0.1), mScrn)
for w in range(12):
    box(f"InstWave_{w}", (ix-0.58+w*0.013, iy+0.075, 0.92+math.sin(w*0.7)*0.03), (0.01, 0.005, 0.005), mLEDg)
for b in range(8):
    box(f"InstScopeBtn_{b}", (ix-0.58+b*0.03, iy-0.06, 0.95), (0.02, 0.015, 0.01), mPlW)
for ch in range(4):
    cyl(f"InstBNC_{ch}", (ix-0.55+ch*0.04, iy-0.1, 0.89), 0.008, 0.02, mMBrsh)

# Advanced Digital Logic Trainer
box("InstTrainer", (ix+0.2, iy, 0.85), (0.35, 0.25, 0.04), mPlG)
box("InstTrainerPanel", (ix+0.2, iy, 0.875), (0.33, 0.23, 0.01), mPlBlk)
for s in range(12):
    sx = ix+0.06+s*0.02
    box(f"InstSwitch_{s}", (sx, iy-0.08, 0.885), (0.012, 0.015, 0.015), mPlW)
    lm = mLEDg if s % 3 == 0 else mLEDr if s % 3 == 1 else bpy.data.materials["LEDy"]
    box(f"InstSwLED_{s}", (sx, iy-0.08, 0.895), (0.008, 0.008, 0.006), lm)
for l in range(16):
    lx = ix+0.05+l*0.018
    lm = [mLEDg, mLEDr, bpy.data.materials["LEDy"], mLEDg][l%4]
    box(f"InstIndLED_{l}", (lx, iy+0.08, 0.885), (0.01, 0.01, 0.006), lm)

# Logic Analyzer on instructor desk
box("InstLA", (ix+0.6, iy, 0.83), (0.1, 0.06, 0.02), mPlBlk)
box("InstLAUSB", (ix+0.655, iy, 0.83), (0.012, 0.025, 0.012), mMBrsh)
for pw in range(16):
    pw_m = [mRed, mBlue, mRed, mBlue][pw%4]
    cyl(f"InstLAProbe_{pw}", (ix+0.56+pw*0.004, iy-0.03, 0.82), 0.002, 0.1, pw_m)

# Instructor computer
box("InstMonitor", (ix, iy+0.35, 0.95), (0.48, 0.02, 0.3), mPlBlk)
box("InstMonScr", (ix, iy+0.362, 0.95), (0.44, 0.005, 0.26), mScrn)
cyl("InstMonStand", (ix, iy+0.3, 0.83), 0.025, 0.14, mMBrsh)
box("InstMonBase", (ix, iy+0.3, 0.80), (0.18, 0.12, 0.01), mPlBlk)
box("InstKeyboard", (ix-0.2, iy+0.1, 0.815), (0.38, 0.14, 0.015), mPlG)
box("InstMouse", (ix+0.28, iy+0.1, 0.815), (0.04, 0.07, 0.02), mPlBlk)
box("InstCPU", (ix+0.7, iy+0.3, 0.86), (0.14, 0.2, 0.32), mPlBlk)
box("InstCPUPanel", (ix+0.7, iy+0.2, 0.86), (0.12, 0.005, 0.28), mPlG)

# Document camera
cyl("DocCamBase", (ix-0.8, iy+0.3, 0.81), 0.06, 0.01, mStl)
cyl("DocCamArm", (ix-0.8, iy+0.3, 0.95), 0.015, 0.3, mStl)
sph("DocCamHead", (ix-0.8, iy+0.3, 1.1), 0.03, mPlBlk)

# Laser pointer (small cylinder on desk)
cyl("LaserPointer", (ix+0.4, iy-0.2, 0.815), 0.008, 0.12, mLEDr)
box("LaserBtn", (ix+0.4, iy-0.17, 0.815), (0.01, 0.008, 0.008), mPlBlk)

# Instructor chair
box("InstChairSeat", (ix, iy+0.1, 0.45), (0.5, 0.5, 0.07), mPlBlk)
box("InstChairBack", (ix, iy+0.36, 0.75), (0.48, 0.05, 0.55), mPlBlk)
cyl("InstChairPed", (ix, iy+0.1, 0.22), 0.035, 0.22, mStl)
cyl("InstChairBase", (ix, iy+0.1, 0.04), 0.28, 0.04, mStl)
for c in range(5):
    ca = c * (2*math.pi/5)
    sph(f"InstCaster_{c}", (ix+0.28*math.cos(ca), iy+0.1+0.28*math.sin(ca), 0.04), 0.03, mPlBlk)

result["stage"] = "Instructor station created"
result["objects"] = len(bpy.data.objects)
`;

const STAGE8 = `
# STAGE 8: Storage cabinets + Educational decorations
${HELPER}

mPANEL = bpy.data.materials["WoodPanel"] if "WoodPanel" in bpy.data.materials else m("WoodPanel", (0.35,0.22,0.12,1), 0.35)
mGlass = bpy.data.materials["Glass"] if "Glass" in bpy.data.materials else m("Glass", (0.75,0.85,0.92,1), 0.02, specular=0.9)
mPlW = bpy.data.materials["PlW"] if "PlW" in bpy.data.materials else m("PlW", (0.91,0.91,0.91,1), 0.6)
mPlG = bpy.data.materials["PlG"] if "PlG" in bpy.data.materials else m("PlG", (0.52,0.52,0.52,1), 0.65)
mPlBlk = bpy.data.materials["PlBlk"] if "PlBlk" in bpy.data.materials else m("PlBlk", (0.08,0.08,0.08,1), 0.6)
mMBrsh = bpy.data.materials["MBrsh"] if "MBrsh" in bpy.data.materials else m("MBrsh", (0.72,0.72,0.74,1), 0.25, 0.9)
mStl = bpy.data.materials["Steel"] if "Steel" in bpy.data.materials else m("Steel", (0.12,0.12,0.12,1), 0.35, 0.92)
mMBlk = bpy.data.materials["MBlk"] if "MBlk" in bpy.data.materials else m("MBlk", (0.04,0.04,0.04,1), 0.55, 0.85)
mWall = bpy.data.materials["WallWhite"] if "WallWhite" in bpy.data.materials else m("WallWhite", (0.93,0.93,0.91,1), 0.85)
mBreadboard = bpy.data.materials["Breadboard"] if "Breadboard" in bpy.data.materials else m("Breadboard", (0.95,0.93,0.85,1), 0.7)
mRed = bpy.data.materials["WireRed"] if "WireRed" in bpy.data.materials else m("WireRed", (0.9,0.1,0.1,1), 0.7)
mBlue = bpy.data.materials["WireBlue"] if "WireBlue" in bpy.data.materials else m("WireBlue", (0.1,0.2,0.9,1), 0.7)
mLEDg = bpy.data.materials["LEDg"] if "LEDg" in bpy.data.materials else m("LEDg", (0.15,0.85,0.15,1), 0.3)

RW, RL, RH = 16.0, 12.0, 3.5

# === STORAGE CABINETS (along left wall, 3 cabinets) ===
for ci in range(3):
    cx = 1.5 + ci * 5.0
    cy = 0.15
    # Cabinet body
    box(f"Cab_{ci}", (cx, cy, 1.0), (1.2, 0.45, 2.0), mPANEL)
    # Glass doors
    box(f"CabGlass_{ci}", (cx, cy+0.24, 1.0), (1.1, 0.02, 1.9), mGlass)
    # Frame
    box(f"CabFrameT_{ci}", (cx, cy+0.24, 1.95), (1.22, 0.04, 0.03), mMBrsh)
    box(f"CabFrameB_{ci}", (cx, cy+0.24, 0.05), (1.22, 0.04, 0.03), mMBrsh)
    box(f"CabFrameL_{ci}", (cx-0.6, cy+0.24, 1.0), (0.04, 0.04, 2.0), mMBrsh)
    box(f"CabFrameR_{ci}", (cx+0.6, cy+0.24, 1.0), (0.04, 0.04, 2.0), mMBrsh)
    # Handle
    cyl(f"CabHandle_{ci}", (cx+0.55, cy+0.27, 1.0), 0.008, 0.12, mMBrsh)
    # Shelves inside
    for sh in range(3):
        box(f"CabShelf_{ci}_{sh}", (cx, cy, 0.3+sh*0.6), (1.1, 0.4, 0.02), mPANEL)
    # Items on shelves
    # Spare breadboards
    for bi in range(3):
        box(f"CabBread_{ci}_{bi}", (cx-0.3+bi*0.3, cy, 0.33+ci*0.6), (0.2, 0.12, 0.01), mBreadboard)
    # IC boxes
    for bi in range(2):
        box(f"CabICBox_{ci}_{bi}", (cx+0.2+bi*0.25, cy, 0.9+ci*0.6), (0.12, 0.08, 0.02), mPlW)
    # Wire bundles
    for bi in range(4):
        wm = [mRed, mBlue, bpy.data.materials["WireYel"], bpy.data.materials["WireGrn"]][bi]
        cyl(f"CabWire_{ci}_{bi}", (cx-0.3+bi*0.2, cy, 1.5), 0.01, 0.08, wm)

# === WHITEBOARD (front wall, large) ===
box("Whiteboard", (RW/2, RL+0.08, 1.8), (0.05, 3.5, 1.5), mPlW)
box("WhiteboardFrame", (RW/2, RL+0.08, 1.8), (0.08, 3.6, 1.6), mMBrsh)
# Whiteboard markers tray
box("MarkerTray", (RW/2, RL+0.12, 1.0), (0.08, 0.6, 0.03), mMBrsh)

# === EDUCATIONAL POSTERS on left wall (10 posters) ===
poster_titles = ["LogicGates", "BooleanAlgebra", "KarnaughMaps", "NumberSystems", "FlipFlops", "Multiplexers", "Decoders", "Encoders", "SeqCircuits", "CombCircuits"]
poster_colors = [
    (0.15, 0.25, 0.6, 1), (0.6, 0.15, 0.15, 1), (0.15, 0.5, 0.2, 1),
    (0.5, 0.3, 0.1, 1), (0.3, 0.15, 0.5, 1), (0.1, 0.4, 0.5, 1),
    (0.5, 0.4, 0.1, 1), (0.2, 0.2, 0.6, 1), (0.5, 0.2, 0.3, 1),
    (0.2, 0.5, 0.3, 1)
]
for pi, (pname, pcol) in enumerate(zip(poster_titles, poster_colors)):
    px = 0.08
    py = 1.5 + pi * 1.0
    if py > RL - 1:
        break
    # Poster background
    mat_p = m(f"Poster_{pname}", pcol, 0.8)
    box(f"Poster_{pname}", (px, py, 1.8), (0.04, 0.8, 0.6), mat_p)
    # Poster frame
    box(f"PosterFrame_{pname}", (px, py, 1.8), (0.06, 0.85, 0.65), mMBrsh)
    # White content area
    box(f"PosterContent_{pname}", (px+0.01, py, 1.8), (0.01, 0.7, 0.5), mPlW)
    # Simulated text lines
    for tl in range(4):
        box(f"PosterLine_{pname}_{tl}", (px+0.025, py, 1.65+tl*0.08), (0.005, 0.55, 0.015), mPlBlk)

# === CABLE TRAY along ceiling ===
box("CableTray2", (RW/2, RL-1.0, RH-0.15), (RW-1.0, 0.12, 0.08), mMBrsh)
# Vertical cable runs
for vc in range(3):
    box(f"CableVert_{vc}", (0.15, 2.0+vc*4.0, RH/2), (0.08, 0.08, RH-0.3), mMBrsh)

result["stage"] = "Storage cabinets, whiteboard, posters, cables added"
result["objects"] = len(bpy.data.objects)
`;

const STAGE9 = `
# STAGE 9: Material refinement + Lighting setup
${HELPER}

import math

scene = bpy.context.scene
RW, RL, RH = 16.0, 12.0, 3.5

# Remove existing lights
for l in bpy.data.lights:
    bpy.data.lights.remove(l)
for l in bpy.data.cameras:
    bpy.data.cameras.remove(l)

# === LIGHTING ===
# Main area light (ceiling, center)
bpy.ops.object.light_add(type='AREA', location=(RW/2, RL/2, RH-0.3))
main_light = bpy.context.active_object
main_light.name = "MainLight"
main_light.data.energy = 2000
main_light.data.size = 4.0
main_light.data.color = (1.0, 0.98, 0.95)

# Window sunlight
bpy.ops.object.light_add(type='SUN', location=(RW+2, RL/2, RH+2))
sun = bpy.context.active_object
sun.name = "SunLight"
sun.data.energy = 3.0
sun.data.color = (1.0, 0.95, 0.85)
sun.rotation_euler = (math.radians(45), 0, math.radians(-30))

# Fill lights (per workstation zone)
for i in range(8):
    lx = 2.5 + (i % 4) * 3.8
    ly = 3.0 + (i // 4) * 6.0
    bpy.ops.object.light_add(type='AREA', location=(lx, ly, RH-0.4))
    wl = bpy.context.active_object
    wl.name = f"WorkLight_{i}"
    wl.data.energy = 200
    wl.data.size = 1.5
    wl.data.color = (1.0, 0.98, 0.96)

# Instructor area light
bpy.ops.object.light_add(type='AREA', location=(8.0, 10.5, RH-0.4))
inst_light = bpy.context.active_object
inst_light.name = "InstructorLight"
inst_light.data.energy = 300
inst_light.data.size = 2.0

# === CAMERA ===
bpy.ops.object.camera_add(location=(RW/2, RL+3, 1.7))
cam = bpy.context.active_object
cam.name = "LabCamera"
cam.rotation_euler = (math.radians(80), 0, math.radians(180))
cam.data.lens = 18  # Wide angle
scene.camera = cam

# === RENDER SETTINGS ===
scene.render.engine = 'CYCLES'
scene.cycles.samples = 256
scene.cycles.use_denoising = True
scene.render.resolution_x = 3840
scene.render.resolution_y = 2160
scene.render.film_transparent = False
scene.world.color = (0.02, 0.02, 0.03)

# World lighting
world = scene.world
if world is None:
    world = bpy.data.worlds.new("World")
    scene.world = world
world.use_nodes = True
bg = world.node_tree.nodes["Background"]
bg.inputs["Color"].default_value = (0.8, 0.85, 0.9, 1)
bg.inputs["Strength"].default_value = 0.3

result["stage"] = "Lighting and camera setup complete"
result["objects"] = len(bpy.data.objects)
result["lights"] = len(bpy.data.lights)
`;

async function main() {
  const stages = [
    ["Stage 1: Room Structure", STAGE1],
    ["Stage 2: Ceiling & Safety", STAGE2],
    ["Stage 3: Workstations", STAGE3],
    ["Stage 4: Equipment Part 1", STAGE4],
    ["Stage 5: Equipment Part 2", STAGE5],
    ["Stage 6: Equipment Part 3", STAGE6],
    ["Stage 7: Instructor Station", STAGE7],
    ["Stage 8: Storage & Decorations", STAGE8],
    ["Stage 9: Lighting & Render", STAGE9],
  ];

  for (const [name, code] of stages) {
    try {
      await runStage(name, code);
      console.log(`  -> ${name} complete`);
    } catch (err) {
      console.error(`  -> ${name} FAILED: ${err.message.substring(0, 300)}`);
      // Continue with next stage
    }
  }
  console.log("\n=== DLD Laboratory build complete! ===");
}

main().catch(console.error);
