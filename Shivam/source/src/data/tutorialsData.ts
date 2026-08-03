import { InteractiveTutorial } from '../types';

export const GUIDED_TUTORIALS: InteractiveTutorial[] = [
  {
    id: 'lab-01-blink-led',
    title: 'Lab 1: Blink LED & Current Limiting',
    category: 'Basic Digital Output',
    difficulty: 'Beginner',
    description: 'Learn how to toggle a digital pin on the Arduino Nano to blink an LED on and off safely using a 220Ω current limiting resistor.',
    requiredComponents: ['arduino-nano', 'breadboard-830', 'led-red-5mm', 'resistor-220r'],
    steps: [
      {
        stepNumber: 1,
        title: 'Place Core Microcontroller & Breadboard',
        instruction: 'Mount the Arduino Nano and 830-point Breadboard onto the AETHER trainer board.',
        highlightComponentIds: ['arduino-nano', 'breadboard-830'],
        expectedOutput: 'Arduino Nano powered via 5V USB line.',
      },
      {
        stepNumber: 2,
        title: 'Wire Common Ground (GND)',
        instruction: 'Connect Arduino Nano GND pin to the Breadboard negative blue ground rail.',
        highlightComponentIds: ['arduino-nano', 'breadboard-830'],
        suggestedConnections: [
          { fromCompId: 'comp-nano', fromPin: 'nano-gnd', toCompId: 'comp-bb', toPin: 'bb-p1-gnd', color: '#3b82f6' }
        ],
        expectedOutput: 'Shared ground rail established.',
      },
      {
        stepNumber: 3,
        title: 'Insert Resistor & LED in Series',
        instruction: 'Connect Arduino Digital Pin D13 to the Red LED Anode (+). Connect LED Cathode (-) to GND through the 220Ω resistor.',
        highlightComponentIds: ['led-red-5mm', 'resistor-220r'],
        suggestedConnections: [
          { fromCompId: 'comp-nano', fromPin: 'nano-d13', toCompId: 'comp-led', toPin: 'led-a', color: '#ef4444' },
          { fromCompId: 'comp-led', fromPin: 'led-k', toCompId: 'comp-res', toPin: 'res-p1', color: '#eab308' },
          { fromCompId: 'comp-res', fromPin: 'res-p2', toCompId: 'comp-bb', toPin: 'bb-p1-gnd', color: '#3b82f6' },
        ],
        expectedOutput: 'Red LED flashes on for 1000ms and off for 1000ms continuously when powered.',
        codeSnippet: `void setup() {\n  pinMode(13, OUTPUT);\n}\nvoid loop() {\n  digitalWrite(13, HIGH);\n  delay(1000);\n  digitalWrite(13, LOW);\n  delay(1000);\n}`,
      },
    ],
    expectedResultDescription: 'The 5mm Red LED blinks rhythmically at 1 Hz frequency while drawing ~18mA current safely.',
  },
  {
    id: 'lab-02-lcd-temp-monitor',
    title: 'Lab 2: I2C LCD 16x2 Temperature Monitor',
    category: 'Displays & Sensors',
    difficulty: 'Intermediate',
    description: 'Interface the DHT11 sensor with the Arduino Nano and display live ambient temperature (°C) and relative humidity (%) on the 16x2 I2C backlit LCD.',
    requiredComponents: ['arduino-nano', 'lcd-1602-i2c', 'sensor-dht11'],
    steps: [
      {
        stepNumber: 1,
        title: 'Power Distribution',
        instruction: 'Connect Arduino 5V and GND to the I2C LCD VCC/GND and DHT11 VCC/GND.',
        highlightComponentIds: ['lcd-1602-i2c', 'sensor-dht11'],
        suggestedConnections: [
          { fromCompId: 'comp-nano', fromPin: 'nano-5v', toCompId: 'comp-lcd', toPin: 'lcd-vcc', color: '#ef4444' },
          { fromCompId: 'comp-nano', fromPin: 'nano-gnd', toCompId: 'comp-lcd', toPin: 'lcd-gnd', color: '#3b82f6' },
        ],
        expectedOutput: 'LCD display backlight turns ON.',
      },
      {
        stepNumber: 2,
        title: 'I2C Serial Communication Bus',
        instruction: 'Connect Arduino Nano A4 (SDA) to LCD SDA and A5 (SCL) to LCD SCL.',
        highlightComponentIds: ['lcd-1602-i2c', 'arduino-nano'],
        suggestedConnections: [
          { fromCompId: 'comp-nano', fromPin: 'nano-a4', toCompId: 'comp-lcd', toPin: 'lcd-sda', color: '#a855f7' },
          { fromCompId: 'comp-nano', fromPin: 'nano-a5', toCompId: 'comp-lcd', toPin: 'lcd-scl', color: '#06b6d4' },
        ],
        expectedOutput: 'I2C communication bus ready.',
      },
      {
        stepNumber: 3,
        title: 'DHT11 Sensor Data Line',
        instruction: 'Connect DHT11 Data pin to Arduino Digital Pin D2.',
        highlightComponentIds: ['sensor-dht11'],
        suggestedConnections: [
          { fromCompId: 'comp-nano', fromPin: 'nano-d2', toCompId: 'comp-dht', toPin: 'dht-data', color: '#22c55e' },
        ],
        expectedOutput: 'LCD prints: "Temp: 24.5 C" on Line 1 and "Humidity: 52%" on Line 2.',
        codeSnippet: `#include <Wire.h>\n#include <LiquidCrystal_I2C.h>\nLiquidCrystal_I2C lcd(0x27, 16, 2);\nvoid setup() {\n  lcd.init(); lcd.backlight();\n  lcd.print("Temp: 24.5 C");\n}`,
      },
    ],
    expectedResultDescription: 'Real-time sensor telemetry is formatted and displayed on the liquid crystal panel.',
  },
  {
    id: 'lab-03-servo-pot-control',
    title: 'Lab 3: Potentiometer Servo Horn Angle Control',
    category: 'Motors & Actuators',
    difficulty: 'Intermediate',
    description: 'Read analog voltage from a 10k potentiometer knob on ADC pin A0 and map it to a 0-180° PWM angle signal to control the SG90 micro servo.',
    requiredComponents: ['arduino-nano', 'potentiometer-10k', 'servo-sg90'],
    steps: [
      {
        stepNumber: 1,
        title: 'Power Servo & Potentiometer',
        instruction: 'Connect 5V and GND rails to Potentiometer Outer Pins and Servo Red/Brown leads.',
        highlightComponentIds: ['potentiometer-10k', 'servo-sg90'],
        expectedOutput: 'Actuator and sensor rail energized.',
      },
      {
        stepNumber: 2,
        title: 'Connect Wiper Analog Signal & Servo PWM',
        instruction: 'Connect Potentiometer Wiper (Center) to Arduino A0. Connect Servo Signal (Orange) to Arduino D9 (PWM).',
        highlightComponentIds: ['arduino-nano', 'servo-sg90', 'potentiometer-10k'],
        suggestedConnections: [
          { fromCompId: 'comp-pot', fromPin: 'pot-wiper', toCompId: 'comp-nano', toPin: 'nano-a0', color: '#eab308' },
          { fromCompId: 'comp-nano', fromPin: 'nano-d9', toCompId: 'comp-servo', toPin: 'srv-pwm', color: '#f97316' },
        ],
        expectedOutput: 'Rotating the potentiometer knob turns the servo arm in 1:1 direct sync.',
        codeSnippet: `#include <Servo.h>\nServo myservo;\nvoid loop() {\n  int val = analogRead(A0);\n  val = map(val, 0, 1023, 0, 180);\n  myservo.write(val);\n}`,
      },
    ],
    expectedResultDescription: 'Smooth positional control of servo horn across full 180° mechanical arc.',
  },
];
