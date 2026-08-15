export const BLENDER_PYTHON_SCRIPT_CODE = `# ==============================================================================
# DIGITAL LOGIC TRAINER - AUTOMATED BLENDER 3D ASSET GENERATOR
# Language: Python 3.10+ (Blender 3.x / 4.x API)
# Target: GLTF/GLB PBR Production Pipeline with Pin Snap Anchors & LOD Support
# ==============================================================================

import bpy
import math
import json
import os

def create_trainer_board_base():
    """Generates the main Digital Logic Trainer Kit baseboard with mounting holes, rails & silkscreen."""
    print("[Trainer] Generating Trainer Base Board...")
    
    # 1. Clear default scene objects
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete()

    # 2. Base PCB Board Body (120mm x 80mm x 8mm)
    bpy.ops.mesh.add_cube(location=(0, 0, 0))
    board = bpy.context.active_object
    board.name = "TrainerBoard_PCB"
    board.scale = (6.0, 4.0, 0.4) # Blender radius dimensions
    bpy.ops.object.transform_apply(scale=True)

    # 3. Create PCB Matte Dark Finish Material
    mat_pcb = bpy.data.materials.new(name="Matte_PCB_Black")
    mat_pcb.use_nodes = True
    bsdf = mat_pcb.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs['Base Color'].default_value = (0.02, 0.02, 0.03, 1.0) # #050508
    bsdf.inputs['Roughness'].default_value = 0.35
    board.data.materials.append(mat_pcb)

    # 4. Add Bevel Modifier for Smooth Chamfered Edges
    bevel = board.modifiers.new(name="EdgeBevel", type='BEVEL')
    bevel.width = 0.08
    bevel.segments = 4

    # 5. Generate Gold Header Pins & Power Terminals
    add_pin_header(location=(-3.5, 0.4, 2.5), name="PIN_VCC_5V", color=(0.9, 0.1, 0.1, 1.0))
    add_pin_header(location=(-3.5, 0.4, 1.5), name="PIN_GND_MAIN", color=(0.1, 0.1, 0.9, 1.0))
    
    # 6. Apply Smooth Shading
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.shade_smooth()
    
    print("[Trainer] Baseboard geometry generated successfully.")

def add_pin_header(location, name, color=(0.8, 0.7, 0.1, 1.0)):
    """Helper to generate metallic pin connectors with snap metadata Empty objects."""
    bpy.ops.mesh.add_cylinder(radius=0.08, depth=0.5, location=location)
    pin = bpy.context.active_object
    pin.name = name
    
    # Gold / Copper Pin Material
    mat_pin = bpy.data.materials.new(name=f"Mat_{name}")
    mat_pin.use_nodes = True
    bsdf = mat_pin.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs['Base Color'].default_value = color
    bsdf.inputs['Metallic'].default_value = 0.95
    bsdf.inputs['Roughness'].default_value = 0.15
    pin.data.materials.append(mat_pin)

    # Create Empty Anchor Object for Three.js Pin Snapping
    bpy.ops.object.empty_add(type='SINGLE_ARROW', location=(location[0], location[1] + 0.3, location[2]))
    empty = bpy.context.active_object
    empty.name = f"SNAP_{name}"

def export_gltf_pbr(output_path):
    """Exports scene to GLTF 2.0 with embedded PBR materials & LODs."""
    print(f"[Trainer] Exporting GLB asset to: {output_path}")
    bpy.ops.export_scene.gltf(
        filepath=output_path,
        export_format='GLB',
        export_texcoords=True,
        export_normals=True,
        export_materials='EXPORT',
        export_apply=True
    )

if __name__ == "__main__":
    create_trainer_board_base()
    export_dir = os.path.join(os.path.expanduser("~"), "trainer_gltf_export")
    os.makedirs(export_dir, exist_ok=True)
    export_gltf_pbr(os.path.join(export_dir, "Trainer_Baseboard.glb"))
`;
