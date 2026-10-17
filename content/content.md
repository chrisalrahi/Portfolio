# Content pack: chrisalrahi.com home page

Verbatim transcript of C:/Users/chris.DESKTOP-S71LEBE/Dev/Portfolio/index.html as of 2026-10-17. HTML entities are decoded and runs of whitespace collapsed; nothing else is changed. Where the page carries two alternative versions of the same paragraph, both are given, marked (full) and (short).

## Site identity and metadata

- Language attribute: en
- Title tag: Chris Al-Rahi | Mechanical Engineering & Computing Technology
- Meta description: Portfolio of Chris Al-Rahi, a mechanical engineering and computing technology co-op student at the University of Ottawa. School design projects, personal builds, and co-op experience at Curtiss-Wright and CanmetENERGY.
- Canonical: https://chrisalrahi.com/
- Domain: chrisalrahi.com
- theme-color: present on the page (value left out of this pack; the redesign sets its own)
- Open Graph and Twitter tags (property: content):
  - og:type: website
  - og:title: Chris Al-Rahi | Mechanical Engineering & Computing Technology
  - og:description: Co-op student at the University of Ottawa. Nine engineering projects, from a brewery sensor system to hands-on repairs.
  - og:url: https://chrisalrahi.com/
  - og:image: https://chrisalrahi.com/assets/img/profile/ConcreteNoSmile.JPG
  - twitter:card: summary_large_image
- Favicon: assets/img/favicon.png
- Apple touch icon: assets/img/apple-touch-icon.png
- JSON-LD block (verbatim):

```json
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Chris Al-Rahi",
    "url": "https://chrisalrahi.com/",
    "image": "https://chrisalrahi.com/assets/img/profile/ConcreteNoSmile.JPG",
    "description": "Mechanical Engineering & Computing Technology student at the University of Ottawa",
    "affiliation": {
      "@type": "CollegeOrUniversity",
      "name": "University of Ottawa"
    },
    "worksFor": {
      "@type": "Organization",
      "name": "Infyl",
      "url": "https://infylworks.com/"
    },
    "sameAs": [
      "https://www.linkedin.com/in/christopher-al-rahi/",
      "https://github.com/chrisalrahi"
    ]
  }
```

## Navigation and footer

### Skip link

- Skip to content -> #main

### Header

- Name link: Chris Al-Rahi -> #hero
- Menu button (no visible text; accessible name "Toggle navigation")
- Main navigation (accessible name "Main"):
  - Projects -> #projects
  - Experience -> #experience
  - About -> #about
  - Contact -> #contact
- Header buttons:
  - Resume -> assets/Docs/Chris%20Al-Rahi%20Resume.pdf
  - LinkedIn profile -> https://www.linkedin.com/in/christopher-al-rahi/ (no visible text; accessible name "LinkedIn profile")
  - GitHub profile -> https://github.com/chrisalrahi (no visible text; accessible name "GitHub profile")
  - Infyl, my custom parts business -> https://infylworks.com (no visible text; accessible name "Infyl, my custom parts business"; tooltip "Infyl")

### Project list

- Title: Project List
- Accessible name: Project list
- Items, each with its number:
  - 1 Liquid-Cooled Chassis -> #cw-chassis (track: work)
  - 2 Shielded RTD Sensor -> #rtd-sensor (track: work)
  - 3 Six-Axis Robot Arm -> #robot-arm (track: personal)
  - 4 Inverted Pendulum -> #inverted-pendulum (track: school)
  - 5 Blade Mold Polisher -> #blade-polisher (track: school)
  - 6 Gear Reducer -> #gear-reducer (track: school)

### Back to top

- Back to top -> #hero (no visible text; accessible name "Back to top")

### Footer

- Text: © 2026 Chris Al-Rahi · Ottawa, ON · Co-founder of Infyl
- Infyl -> https://infylworks.com

## Hero copy

- Section id: hero
- Greeting: Hello, I'm
- Name: Chris Al-Rahi
- Heading as one line: Hello, I'm Chris Al-Rahi
- Paragraph 1: Mechanical Engineering & Computing Technology student at the University of Ottawa
- Paragraph 2: Co-op · graduating April 2027 · Ottawa, ON · open to co-op and internship roles
- Buttons:
  - Resume (PDF) -> assets/Docs/Chris%20Al-Rahi%20Resume.pdf
  - LinkedIn -> https://www.linkedin.com/in/christopher-al-rahi/
  - Email -> mailto:chris.alrahi@gmail.com
- Image: assets/img/opt/hero-chris.webp | Chris Al-Rahi | 640 x 767 | no caption

## Featured projects

- Section id: projects
- Label: Sheet · Projects
- Heading: Projects
- Intro: A mix of co-op work projects, school design projects, personal builds, and things I fixed along the way.
- Filter buttons (accessible name "Filter projects"), each filtering the projects by track:
  - Work
  - School
  - Personal
- View my slide deck -> deck.html
- Text that site.js adds (not in index.html): the group heading "Work projects" over cw-chassis and rtd-sensor, and "School projects" over inverted-pendulum, blade-polisher and gear-reducer; each group also gets the line "Swipe sideways · 2 projects" or "Swipe sideways · 3 projects" and a position counter in the form "1 / 2".

### Liquid-Cooled Chassis Redesign

- Project id: cw-chassis
- Number: 1
- Track label: Work
- Context line: Curtiss-Wright · 2025
- Heading: Liquid-Cooled Chassis Redesign
- Intro (full): I reworked the liquid cooling geometry of a ruggedized electronics chassis to see if cheaper machining methods could hold the same thermal performance.
- Intro (short): Redrew the liquid cooling paths of a rugged electronics chassis so cheaper machining could hold the same thermal performance.
- Details label: Role and outcome
- My role: I redrew the cooling paths in CAD around cheaper machining processes, then ran Flotherm simulations to compare the new geometry against the original.
- Outcome: A manufacturable, lower-cost layout the team could build against. Alongside it I ran thermal and environmental testing on nine conduction-cooled products.
- Tags:
  - Flotherm
  - Thermal design
  - CAD
- Links: none
- Images:
  - assets/img/opt/cw-chassis.webp | The ruggedized VPX electronics chassis behind the liquid cooling redesign | 800 x 753 | no caption
- Image label text: RUGGEDIZED VPX CHASSIS

### Aspirated & Shielded RTD Sensor

- Project id: rtd-sensor
- Number: 2
- Track label: Work
- Context line: CanmetENERGY · Renewable Heat & Power · 2025
- Heading: Aspirated & Shielded RTD Sensor
- Intro (full): Air temperature readings inside the SolarSteam enclosure were being thrown off by radiation, so I built a shielded sensor that slides up and down to sample at any height.
- Intro (short): A shielded, height-adjustable air temperature sensor that took radiation error out of the readings.
- Details label: Role and outcome
- My role: I designed the shield in SolidWorks, sized the aspiration from the literature, and ran the accuracy testing myself.
- Outcome: Live temperature accuracy improved by more than 30%, and I presented the work as a research poster.
- Tags:
  - SolidWorks
  - Instrumentation
  - Field testing
- Links: none
- Images:
  - assets/img/opt/about-nrcan.webp | Chris Al-Rahi presenting the aspirated and shielded RTD sensor research poster at CanmetENERGY | 800 x 931 | no caption

### Six-Axis Robot Arm

- Project id: robot-arm
- Number: 3
- Track label: Personal
- Context line: With Nik · In progress
- Heading: Six-Axis Robot Arm
- Intro (full): A desktop robot arm my friend Nik and I are building to lift finished prints off the 3D printer on its own. Six NEMA 17 steppers drive planetary reducers we print ourselves, with a camera on the wrist.
- Intro (short): A desktop arm my friend Nik and I are building to lift finished prints off the 3D printer, with six printed planetary reducers and a wrist camera.
- Details label: Role and status
- My role: Nik and I worked together to make different parts of the mechanical design, iterating on each other's revisions of the electronics schematic and the building plan.
- Status: A complete CAD prototype, with 93 printed parts designed, the wiring schematic drawn, and the motors, bearings and boards picked. Next is printing one large and one small reducer and testing them on the bench.
- Tags:
  - 3D printing
  - Planetary gearing
  - ESP32 + CAN bus
  - Stepper motors
- Key figures:
  - Axes: 6
  - Shoulder reduction: 256:1
  - Payload target: 300 g
  - Printed parts: 93
- Links: none
- Images:
  - assets/img/opt/arm-render.webp | CAD render of the six-axis robot arm on its base plate | 1120 x 840 | no caption
  - assets/img/opt/arm-schematic.webp | Hand-drawn Mk-2 electronics schematic: 24 V supply, buck converters, ESP32, CAN bus to each joint, emergency stop relays | 900 x 1334 | no caption
  - assets/img/opt/arm-covers.webp | CAD render of the arm with its covers removed, showing the planetary reducers and motors | 1120 x 840 | no caption

### Inverted Pendulum

- Project id: inverted-pendulum
- Number: 4
- Track label: School
- Context line: Control Systems
- Heading: Inverted Pendulum
- Intro (full): A belt-driven cart on a 0.5 m rail that balances a rigid pendulum upright, with a rotary encoder reading the angle and nothing telling it where the cart is.
- Intro (short): A belt-driven cart that balances a pendulum upright using only the angle from an encoder.
- Details label: Role and outcome
- My role: I designed every 3D printed part on the rig, sourced all the parts, optimized the electronics layout, and helped tune the PID controller.
- Outcome: A closed-loop system that holds the pendulum upright and recovers from disturbances.
- Tags:
  - SolidWorks
  - Arduino (C++)
  - PID control
  - 3D printing
- Links: none
- Video:
  - Desktop source: assets/video/pendulum.mp4
  - Mobile source: assets/video/pendulum-m.mp4 (site.js uses it on small or touch screens)
  - Poster: assets/img/opt/pendulum-poster.webp | The inverted pendulum rig balancing on its rail in the controls lab | 816 x 334
  - Caption: The pendulum in action
  - Video attributes: muted, loop, playsinline, preload none
- Images:
  - assets/img/opt/pendulum-tuning.webp | Step response plots from tuning the PID controller at three proportional gains | 560 x 420 | Step response at three proportional gains
  - assets/img/opt/pendulum-cad.webp | SolidWorks assembly of the pendulum cart, rail, motor, and electronics enclosure | 560 x 420 | SolidWorks assembly

### Turbine Blade Mold Polisher

- Project id: blade-polisher
- Number: 5
- Track label: School
- Context line: MCG 2101
- Heading: Turbine Blade Mold Polisher
- Intro (full): A pneumatic gantry system that polishes 9-metre wind turbine blade molds automatically, replacing a job that used to be slow, inconsistent, and physically demanding to do by hand.
- Intro (short): A pneumatic gantry that polishes 9-metre wind turbine blade molds automatically.
- Details label: Role and outcome
- My role: I helped design the mechanical layout and motion system: the gantry, the yoke, and the spring-connected polishing plates that conform to the curved mold surface.
- Outcome: We finished with a complete CAD assembly, a full drawing package, and an interactive 3D model of a system that keeps constant polishing pressure across a complex curved surface.
- Tags:
  - SolidWorks
  - Engineering drawings
  - Pneumatic actuation
- Links:
  - 3D model (Sketchfab) -> https://skfb.ly/pCKSo
  - Video -> https://drive.google.com/file/d/1IAgGhyez_0Hg4_hqSXrPCs9KN8DNypPy/view?usp=sharing
  - Report (PDF) -> assets/Docs/MCG2101%20-%20Turbine%20Mold%20Polisher%20-%20Deliverable%2310%20E2-2.pdf
- Images:
  - assets/img/opt/blade-polisher.webp | Isometric CAD render of the turbine blade mold polisher gantry system | 800 x 560 | no caption

### Two-Stage Gear Reducer

- Project id: gear-reducer
- Number: 6
- Track label: School
- Context line: Machine Design
- Heading: Two-Stage Gear Reducer
- Intro (one version only): A 9:1 reducer for an industrial conveyor drive, taking 6 hp at 400 rpm down to 45 rpm.
- Details label: Role and outcome
- My role: I sized the two-stage gear reduction and ran the bending and moment failure analysis, and I designed every part in the assembly except the shaft.
- Outcome: A sealed unit validated for a five-year service life, with a full drawing package to go with it.
- Tags:
  - SolidWorks
  - Gear design
  - Failure analysis
  - Engineering drawings
- Key figures:
  - Ratio: 9:1
  - Input: 6 hp at 400 rpm
  - Output: 45 rpm (the HTML text here reads "400 rpm"; the page counts the number from 400 to 45, matching the intro's 45 rpm)
  - Service life: 5 years
- Links: none
- Images:
  - assets/img/opt/reducer-exploded.webp | Exploded view of the two-stage gear reducer assembly | 545 x 307 | no caption
  - assets/img/opt/reducer-assembly.webp | CAD render of the gear reducer with the casing shown transparent | 560 x 420 | no caption
  - assets/img/opt/reducer-drawing.webp | Top level assembly drawing of the gear reducer with its parts list | 560 x 420 | no caption

## More projects, builds and repairs

- Heading: More projects, builds & repairs
- Intro: A few more school projects, plus things I've built and fixed on my own time.
- Hint text: Swipe sideways · 8 projects
- No card carries a Before or After badge.

### Pool Heater Recovery

- Card id: none
- Badge text: Personal
- Course code: none
- Heading: Pool Heater Recovery
- Paragraph (full): The pool heater's heat exchanger had a burst pipe, so I sourced a new one, took the heater apart, and replaced the whole exchanger myself.
- Paragraph (short): Found a burst pipe in the heat exchanger, sourced a new one and swapped it in myself.
- Tags:
  - Heat exchangers
  - Leak diagnosis
- Links: none
- Images:
  - assets/img/opt/pool-heater-1-housing.webp | Pool heater heat exchanger in its housing, with the fins corroded green | 480 x 720 | no caption
  - assets/img/opt/pool-heater-2-removed.webp | Old heat exchanger pulled out of the pool heater | 480 x 360 | no caption
  - assets/img/opt/pool-heater-3-new.webp | New copper heat exchanger in its box before installation | 480 x 360 | no caption

### Hot-Tub Heater Repair

- Card id: none
- Badge text: Personal
- Course code: none
- Heading: Hot-Tub Heater Repair
- Paragraph (full): Traced a hot tub error to a burnt heater port on the control board, then desoldered it and soldered in a new one to get the hot tub running again.
- Paragraph (short): Traced a hot tub error to a burnt heater port, then desoldered and replaced it on the board.
- Tags:
  - PCB rework
  - Soldering
- Links: none
- Images:
  - assets/img/opt/hottub-1-burnt-port.webp | Burnt heater port desoldered from the hot tub control board, beside the scorched pads it came off | 480 x 720 | no caption
  - assets/img/opt/hottub-2-repaired.webp | Repaired control board back in the hot tub with the new heater port soldered in | 480 x 720 | no caption

### Mobilitray

- Card id: mobilitray
- Badge text: School
- Course code: GNG 2101
- Heading: Mobilitray
- Paragraph (full): A foldable tray that clips onto posterior walkers so users can carry things without losing stability. It held five pounds in user testing.
- Paragraph (short): A foldable tray that clips onto posterior walkers. Holds five pounds, folds flat.
- Tags:
  - SolidWorks
  - 3D printing
  - User testing
- Links:
  - MakeRepo -> https://makerepo.com/ChristopherAlRahi/1904.gng2101group-a-41mobilitray
  - Manual (PDF) -> assets/Docs/Mobilitray%20-%20User%20and%20Product%20Manual%204.1.pdf
- Images:
  - assets/img/opt/mobilitray.webp | Mobilitray prototype clipped onto a posterior walker | 560 x 420 | no caption

### Beer Goggles

- Card id: beer-goggles
- Badge text: School
- Course code: GNG 1103
- Heading: Beer Goggles
- Paragraph (full): A tank-mounted gravity and temperature monitor for Beyond the Pale Brewing. I led our team of five, and it read specific gravity within ±0.1.
- Paragraph (short): A tank-mounted gravity and temperature monitor for Beyond the Pale Brewing, so nobody has to sample by hand.
- Tags:
  - Arduino (C++)
  - Sensor calibration
  - SolidWorks
- Links:
  - MakeRepo -> https://makerepo.com/ChristopherAlRahi/1336.gng1103b04group16beergoggles
  - Manual (PDF) -> assets/Docs/Beer%20Goggles%20-%20User%20and%20Product%20Manual.pdf
- Images:
  - assets/img/opt/beer-goggles.webp | The Beer Goggles team with the fermentation-monitoring prototype | 667 x 500 | no caption

### Greenhouse Controller

- Card id: greenhouse
- Badge text: School
- Course code: ELG 3336
- Heading: Greenhouse Controller
- Paragraph (full): A climate controller my partner and I built that watches temperature, humidity, light and air quality, and corrects them on its own. I coded the full setup.
- Paragraph (short): A controller that watches temperature, humidity, light and air quality, and corrects them on its own.
- Tags:
  - Arduino (C++)
  - Circuit design
- Links:
  - Demo video -> https://drive.google.com/file/d/1O8_wQxcrmUnVgzpRxvYgv5CmfnYpsajJ/view?usp=sharing
  - Report (PDF) -> assets/Docs/ELG%203336%20-%20Greenhouse%20System%20-%20Final%20Report.docx.pdf
- Images:
  - assets/img/opt/greenhouse.webp | Assembled greenhouse climate controller with sensors and wiring | 540 x 563 | no caption

### Balsa Truss Bridge

- Card id: truss-analysis
- Badge text: School
- Course code: CVG 2140
- Heading: Balsa Truss Bridge
- Paragraph (full): A balsa wood truss bridge we designed by hand using a hybrid Pratt-Warren layout, then built and load tested. It hit a load-to-weight ratio of 292.5.
- Paragraph (short): A hand-designed balsa truss bridge, built and load tested to a 292.5 load-to-weight ratio.
- Tags:
  - Structural analysis
  - Load testing
- Links:
  - Report (PDF) -> assets/Docs/CVG%202140%20-%20Truss%20Analysis%20-%20Final%20Report.pdf
- Images:
  - assets/img/opt/truss-bridge.webp | Balsa wood truss bridge built for load testing | 560 x 420 | no caption

### Car Fender Repair

- Card id: none
- Badge text: Personal
- Course code: none
- Heading: Car Fender Repair
- Paragraph (full): The fender was cracked, so I repaired it myself. Filled and sanded the panel, matched the paint, and refit it on the car.
- Paragraph (short): Filled, sanded, paint-matched and refit a cracked fender myself.
- Tags:
  - Surface prep
  - Finishing
- Links: none
- Images:
  - assets/img/opt/fender-1-broken.webp | Cracked car fender before repair | 480 x 490 | no caption
  - assets/img/opt/fender-2-paint.webp | Fender during sanding and painting | 480 x 598 | no caption
  - assets/img/opt/fender-3-fixed.webp | Repaired fender with colour-matched finish | 480 x 429 | no caption
  - assets/img/opt/fender-4-installed.webp | Finished fender reinstalled on the car | 480 x 641 | no caption

### Foldable Ping-Pong Table

- Card id: none
- Badge text: Personal
- Course code: none
- Heading: Foldable Ping-Pong Table
- Paragraph (one version only): Designed and built a fold-away top that turns our pool table into a ping pong table in seconds.
- Tags:
  - CAD
  - Fabrication
  - 3D printing
- Links: none
- Images:
  - assets/img/opt/ping-pong.webp | Foldable ping-pong table top mounted on a pool table | 601 x 625 | no caption

## Experience

- Section id: experience
- Heading: Experience
- Intro: Three co-op terms so far, split between defense electronics and renewable energy research, and a custom parts business I started this fall.
- Hint text: Swipe sideways · 4 roles
- Education block (comes after the four roles):
  - Degree line: BASc Mechanical Engineering + BSc Computing Technology (Co-op)
  - Second line: University of Ottawa · April 2027 · Dean's Honour List
  - Button: Download Resume -> assets/Docs/Chris%20Al-Rahi%20Resume.pdf

### Infyl - Co-founder

- Heading as written: Infyl - Co-founder
- Employer: Infyl
- Title: Co-founder
- Date and location line as written: Oct 2026–Present · Ottawa
- Date range: Oct 2026–Present
- Location: Ottawa
- Paragraph (full): A custom parts business I started with my friend Nik. People tell us what they need, and we design the part in CAD from their measurements, 3D print it, and ship it to them.
- Paragraph (short): A custom parts business I started with my friend Nik. We design parts in CAD from a customer's measurements and 3D print them.
- Logo: assets/img/opt/infyl-logo.webp | Infyl | 281 x 160
- Link (logo and text together): infylworks.com -> https://infylworks.com

### Curtiss-Wright Defense - Mechanical Engineering Intern

- Heading as written: Curtiss-Wright Defense - Mechanical Engineering Intern
- Employer: Curtiss-Wright Defense
- Title: Mechanical Engineering Intern
- Date and location line as written: Sep–Dec 2025 · Ottawa
- Date range: Sep–Dec 2025
- Location: Ottawa
- Paragraph (full): Assembled and validated 8 ruggedized electronics chassis, ran environmental and thermal reliability testing on 9 conduction-cooled products (over 4,000 insertions and 80+ thermal cycles), and used Flotherm simulations to help guide liquid-cooled hardware design.
- Paragraph (short): Built and validated 8 rugged chassis, ran thermal and environmental testing on 9 products, and used Flotherm to guide liquid-cooled design.
- Logo: assets/img/opt/cw-logo.webp | Curtiss-Wright | 252 x 96 | logo variant: wide
- Link (logo and text together): curtisswright.com -> https://www.curtisswright.com/

### CanmetENERGY (NRCan) - Research Assistant, Renewable Heat & Power

- Heading as written: CanmetENERGY (NRCan) - Research Assistant, Renewable Heat & Power
- Employer: CanmetENERGY (NRCan)
- Title: Research Assistant, Renewable Heat & Power
- Date and location line as written: May–Aug 2025 · Ottawa
- Date range: May–Aug 2025
- Location: Ottawa
- Paragraph (full): Tracked down why a solar tracker was stuck at ±15° and redesigned the mechanism to restore its full ±40° range. Also built a height-adjustable shielded sensor system that improved live temperature accuracy by more than 30%.
- Paragraph (short): Restored a solar tracker's full ±40° range and built a shielded sensor that improved temperature accuracy by over 30%.
- Logo: assets/img/opt/canmet-logo.webp | CanmetENERGY | 701 x 72 | logo variant: wordmark
- Link (logo and text together): Solar energy systems -> https://natural-resources.canada.ca/science-data/science-research/research-centres/solar-energy-systems

### CanmetENERGY (NRCan) - Research Assistant, Alternative Energies Lab

- Heading as written: CanmetENERGY (NRCan) - Research Assistant, Alternative Energies Lab
- Employer: CanmetENERGY (NRCan)
- Title: Research Assistant, Alternative Energies Lab
- Date and location line as written: Jan–Apr 2025 · Ottawa
- Date range: Jan–Apr 2025
- Location: Ottawa
- Paragraph (full): Designed four ventilation and mechanical CAD layouts across three heat pump projects, and automated the performance analysis with VBA to cut processing time by about 90%.
- Paragraph (short): Designed four CAD layouts across three heat pump projects and automated the analysis with VBA, cutting processing time by about 90%.
- Logo: assets/img/opt/canmet-logo.webp | CanmetENERGY | 701 x 72 | logo variant: wordmark
- Link (logo and text together): Heat pump systems -> https://natural-resources.canada.ca/science-data/science-research/research-centres/high-performance-cost-effective-hvac-systems-residential-commercial-buildings

## About

- Section id: about
- Heading: About
- Line under the heading: A little more about me
- Label: Notes
- Paragraph 1 (full): I love innovating. Building is my passion, and understanding is my method. If I see something that could be better, I work on making it better. I'm studying Mechanical Engineering and Computing Technology at uOttawa, and most of what's on this site started as something I wanted to figure out for myself.
- Paragraph 1 (short): I love building things and understanding how they work. If something could be better, I work on making it better. Right now that's a six-axis robot arm, the piano, and training for my next fight.
- Paragraph 2 (full version only; there is no short version): I'm competitive, and I commit fully to whatever I take on. Right now that's a six-axis robot arm, teaching myself the piano, and training for my next fight, with travelling and scuba diving filling whatever time I have left.
- Interests, in order:
  - Muay Thai
  - Scuba Diving
  - Volleyball
  - Travel
  - Reading
- Image: assets/img/opt/about-chris.webp | Chris Al-Rahi | 800 x 1000 | no caption

## Contact

- Section id: contact
- Heading: Contact
- Intro: Hope you enjoyed looking around. If anything caught your interest, don't hesitate to reach out!
- Quick links:
  - chris.alrahi@gmail.com -> mailto:chris.alrahi@gmail.com
  - LinkedIn -> https://www.linkedin.com/in/christopher-al-rahi/
  - GitHub -> https://github.com/chrisalrahi
  - Infyl -> https://infylworks.com
- No resume link in this section (the resume links are in the header, the hero and the education block).

## Contact form

- Intro text: Or fill out the form, all messages go straight to my inbox.
- Action URL: https://formspree.io/f/mldoepqq
- Method: POST
- Inputs in order (name | type | label text | placeholder | required). None has a visible label; the label text is the aria-label.
  - name | text | Your Name | Your Name | yes
  - email | email | Your Email | Your Email | yes
  - subject | text | Subject | Subject | yes
  - message | textarea | Message | Message | yes
- Submit button text: Send Message
- What site.js does on submit:
  - Cancels the normal page submit and sends the fields as FormData with fetch to the action URL, method POST, with the header Accept: application/json.
  - While sending, the button text changes to "Sending..." and the button is disabled.
  - On success (response.ok): appends a paragraph inside the form with the text "Thanks, your message has been sent!", resets the form (clears every field), and removes the message after 5 seconds (setTimeout, 5000 ms). The form is not hidden.
  - On failure (response not ok): a browser alert with the text "There was a problem sending your message."
  - On a network error (fetch throws): a browser alert with the text "Network error, please try again later."
  - In every case afterwards: the button text goes back to its original "Send Message" and the button is enabled again.
  - sending and crossingPending in the quote below only hold off a site.js page reload until a send finishes; they change nothing the visitor sees.

```js
    form.addEventListener("submit", async (e) => {
      e.preventDefault(); // stop page reload
      const formData = new FormData(form);

      // show quick "sending" feedback
      const button = form.querySelector('button[type="submit"]');
      const originalText = button.textContent;
      button.textContent = "Sending...";
      button.disabled = true;

      sending = true;
      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: { "Accept": "application/json" }
        });

        if (response.ok) {
          // create or show thank-you message
          let msg = document.createElement("p");
          msg.textContent = "Thanks, your message has been sent!";
          // [three presentation lines omitted from this pack]
          form.appendChild(msg);

          form.reset();

          // remove message after 5 seconds
          setTimeout(() => msg.remove(), 5000);
        } else {
          alert("There was a problem sending your message.");
        }
      } catch (error) {
        alert("Network error, please try again later.");
      } finally {
        sending = false;
        button.textContent = originalText;
        button.disabled = false;
        if (crossingPending) onStripChange();
      }
    });
```

## All links

Every link that is not an in-page # link or the mailto link opens in a new tab (target _blank, rel noopener).

| href | first label | where it appears |
|---|---|---|
| https://chrisalrahi.com/ | (canonical link) | Site identity and metadata |
| assets/img/favicon.png | (favicon) | Site identity and metadata |
| assets/img/apple-touch-icon.png | (apple touch icon) | Site identity and metadata |
| #main | Skip to content | Navigation: skip link |
| #hero | Chris Al-Rahi | Header name link; Back to top |
| #projects | Projects | Header navigation |
| #experience | Experience | Header navigation |
| #about | About | Header navigation |
| #contact | Contact | Header navigation |
| assets/Docs/Chris%20Al-Rahi%20Resume.pdf | Resume | Header; Hero ("Resume (PDF)"); Experience education block ("Download Resume") |
| https://www.linkedin.com/in/christopher-al-rahi/ | LinkedIn profile (accessible name) | Header; Hero ("LinkedIn"); Contact ("LinkedIn") |
| https://github.com/chrisalrahi | GitHub profile (accessible name) | Header; Contact ("GitHub") |
| https://infylworks.com | Infyl, my custom parts business (accessible name) | Header; Experience: Infyl ("infylworks.com"); Contact ("Infyl"); Footer ("Infyl") |
| #cw-chassis | Liquid-Cooled Chassis | Project list |
| #rtd-sensor | Shielded RTD Sensor | Project list |
| #robot-arm | Six-Axis Robot Arm | Project list |
| #inverted-pendulum | Inverted Pendulum | Project list |
| #blade-polisher | Blade Mold Polisher | Project list |
| #gear-reducer | Gear Reducer | Project list |
| mailto:chris.alrahi@gmail.com | Email | Hero; Contact ("chris.alrahi@gmail.com") |
| deck.html | View my slide deck | Featured projects intro |
| https://skfb.ly/pCKSo | 3D model (Sketchfab) | Featured project: Turbine Blade Mold Polisher |
| https://drive.google.com/file/d/1IAgGhyez_0Hg4_hqSXrPCs9KN8DNypPy/view?usp=sharing | Video | Featured project: Turbine Blade Mold Polisher |
| assets/Docs/MCG2101%20-%20Turbine%20Mold%20Polisher%20-%20Deliverable%2310%20E2-2.pdf | Report (PDF) | Featured project: Turbine Blade Mold Polisher |
| https://makerepo.com/ChristopherAlRahi/1904.gng2101group-a-41mobilitray | MakeRepo | More projects: Mobilitray |
| assets/Docs/Mobilitray%20-%20User%20and%20Product%20Manual%204.1.pdf | Manual (PDF) | More projects: Mobilitray |
| https://makerepo.com/ChristopherAlRahi/1336.gng1103b04group16beergoggles | MakeRepo | More projects: Beer Goggles |
| assets/Docs/Beer%20Goggles%20-%20User%20and%20Product%20Manual.pdf | Manual (PDF) | More projects: Beer Goggles |
| https://drive.google.com/file/d/1O8_wQxcrmUnVgzpRxvYgv5CmfnYpsajJ/view?usp=sharing | Demo video | More projects: Greenhouse Controller |
| assets/Docs/ELG%203336%20-%20Greenhouse%20System%20-%20Final%20Report.docx.pdf | Report (PDF) | More projects: Greenhouse Controller |
| assets/Docs/CVG%202140%20-%20Truss%20Analysis%20-%20Final%20Report.pdf | Report (PDF) | More projects: Balsa Truss Bridge |
| https://www.curtisswright.com/ | curtisswright.com | Experience: Curtiss-Wright Defense |
| https://natural-resources.canada.ca/science-data/science-research/research-centres/solar-energy-systems | Solar energy systems | Experience: CanmetENERGY, Renewable Heat & Power |
| https://natural-resources.canada.ca/science-data/science-research/research-centres/high-performance-cost-effective-hvac-systems-residential-commercial-buildings | Heat pump systems | Experience: CanmetENERGY, Alternative Energies Lab |

Form action (not an href): https://formspree.io/f/mldoepqq, used by the Contact form.

## Em dash audit

none found
