import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import { TechItem, categoryColors } from "../data/techStack";

interface PhysicsStackProps {
  temperature: number;
  onIconClick: (item: TechItem) => void;
  techData: TechItem[];
}

export const PhysicsStack: React.FC<PhysicsStackProps> = ({
  temperature,
  onIconClick,
  techData,
}) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const itemsMapRef = useRef<Map<number, TechItem>>(new Map());
  const trailsRef = useRef<Map<number, { x: number; y: number }[]>>(new Map());
  const temperatureRef = useRef(temperature);

  useEffect(() => {
    temperatureRef.current = temperature;
  }, [temperature]);

  useEffect(() => {
    if (!sceneRef.current) return;

    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Events = Matter.Events;

    const engine = Engine.create();
    engineRef.current = engine;

    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
        pixelRatio: window.devicePixelRatio,
      },
    });
    renderRef.current = render;

    // Walls
    const wallOptions = { isStatic: true, render: { visible: false } };
    Composite.add(engine.world, [
      Bodies.rectangle(width / 2, height + 25, width, 50, wallOptions), // Bottom
      Bodies.rectangle(-25, height / 2, 50, height, wallOptions), // Left
      Bodies.rectangle(width + 25, height / 2, 50, height, wallOptions), // Right
    ]);

    // Create bodies for tech items
    const bodies = techData.map((item) => {
      const radius = 30 + item.proficiency * 1.5;
      const x = Math.random() * (width - radius * 2) + radius;
      const y = Math.random() * -500 - 50; // Start above screen

      const body = Bodies.circle(x, y, radius, {
        restitution: 0.6,
        friction: 0.1,
        render: {
          fillStyle: categoryColors[item.category]?.pri || "#ffaa00",
          strokeStyle: "#ffffff",
          lineWidth: 2,
        },
        label: item.id,
      });

      itemsMapRef.current.set(body.id, item);
      trailsRef.current.set(body.id, []);
      return body;
    });

    Composite.add(engine.world, bodies);

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Handle clicks
    Events.on(mouseConstraint, "mousedown", (event) => {
      const mousePosition = event.mouse.position;
      const bodiesUnderMouse = Matter.Query.point(
        engine.world.bodies,
        mousePosition,
      );
      if (bodiesUnderMouse.length > 0) {
        const clickedBody = bodiesUnderMouse[0];
        const item = itemsMapRef.current.get(clickedBody.id);
        if (item) {
          onIconClick(item);
        }
      }
    });

    // Collision glow effect
    const glowingBodies = new Set<number>();
    Events.on(engine, "collisionStart", (event) => {
      event.pairs.forEach((pair) => {
        if (!pair.bodyA.isStatic && !pair.bodyB.isStatic) {
          glowingBodies.add(pair.bodyA.id);
          glowingBodies.add(pair.bodyB.id);

          // Remove glow after a short delay
          setTimeout(() => {
            glowingBodies.delete(pair.bodyA.id);
            glowingBodies.delete(pair.bodyB.id);
          }, 300);
        }
      });
    });

    // Custom rendering for text inside circles and trails
    Events.on(render, "afterRender", () => {
      const context = render.context;

      engine.world.bodies.forEach((body) => {
        if (body.isStatic) return;

        const item = itemsMapRef.current.get(body.id);
        if (item) {
          // Update trails
          const trail = trailsRef.current.get(body.id);
          if (trail) {
            trail.unshift({ x: body.position.x, y: body.position.y });
            if (trail.length > 15) trail.pop(); // Keep last 15 positions

            // Draw trails
            if (trail.length > 1) {
              context.beginPath();
              context.moveTo(trail[0].x, trail[0].y);
              for (let i = 1; i < trail.length; i++) {
                context.lineTo(trail[i].x, trail[i].y);
              }
              context.strokeStyle = `${categoryColors[item.category]?.pri || "#ffaa00"}40`; // 25% opacity
              context.lineWidth = 4;
              context.lineCap = "round";
              context.lineJoin = "round";
              context.stroke();
            }
          }

          context.font = 'bold 12px "JetBrains Mono", monospace';
          context.fillStyle = "#ffffff";
          context.textAlign = "center";
          context.textBaseline = "middle";

          // Draw text
          const text =
            item.name.length > 8 ? item.name.substring(0, 6) + ".." : item.name;
          context.fillText(text, body.position.x, body.position.y);

          // Draw glow if temperature is high or colliding
          if (temperatureRef.current > 80 || glowingBodies.has(body.id)) {
            context.shadowColor =
              categoryColors[item.category]?.pri || "#ffaa00";
            context.shadowBlur = glowingBodies.has(body.id) ? 20 : 15;
            context.stroke();
            context.shadowBlur = 0;
          }
        }
      });
    });

    // Handle temperature changes and magnetic attraction
    Events.on(engine, "beforeUpdate", () => {
      // Magnetic attraction between same categories
      if (temperatureRef.current < 100) {
        // Disable magnetic attraction if temperature is max (chaos)
        const bodies = engine.world.bodies.filter((b) => !b.isStatic);
        for (let i = 0; i < bodies.length; i++) {
          for (let j = i + 1; j < bodies.length; j++) {
            const bodyA = bodies[i];
            const bodyB = bodies[j];
            const itemA = itemsMapRef.current.get(bodyA.id);
            const itemB = itemsMapRef.current.get(bodyB.id);

            if (itemA && itemB && itemA.category === itemB.category) {
              const dx = bodyB.position.x - bodyA.position.x;
              const dy = bodyB.position.y - bodyA.position.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              // Apply attraction if close enough (e.g., within 150px)
              if (distance < 150 && distance > 0) {
                const forceMagnitude = (0.00005 * (150 - distance)) / 150;
                const force = {
                  x: (dx / distance) * forceMagnitude,
                  y: (dy / distance) * forceMagnitude,
                };
                Matter.Body.applyForce(bodyA, bodyA.position, force);
                Matter.Body.applyForce(bodyB, bodyB.position, {
                  x: -force.x,
                  y: -force.y,
                });
              }
            }
          }
        }
      }
    });

    Render.run(render);
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas) {
        render.canvas.remove();
      }
      Engine.clear(engine);
    };
  }, [techData]); // Re-initialize if techData changes

  // Handle temperature changes
  useEffect(() => {
    if (!engineRef.current) return;
    const engine = engineRef.current;

    if (temperature === 0) {
      engine.gravity.y = 0;
      engine.world.bodies.forEach((body) => {
        if (!body.isStatic) {
          Matter.Body.setVelocity(body, { x: 0, y: 0 });
          Matter.Body.setAngularVelocity(body, 0);
        }
      });
    } else if (temperature <= 50) {
      engine.gravity.y = 1 * (temperature / 50);
    } else {
      engine.gravity.y = 1;
      // Apply random forces if temperature is high
      const vibrationInterval = setInterval(() => {
        const forceMagnitude = (temperature - 50) * 0.00005;
        engine.world.bodies.forEach((body) => {
          if (!body.isStatic) {
            Matter.Body.applyForce(body, body.position, {
              x: (Math.random() - 0.5) * forceMagnitude,
              y: (Math.random() - 0.5) * forceMagnitude,
            });
          }
        });
      }, 100);
      return () => clearInterval(vibrationInterval);
    }
  }, [temperature]);

  return (
    <div
      className="w-full h-full relative overflow-hidden rounded-3xl"
      ref={sceneRef}
    >
      {/* Noise Background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Matter.js canvas will be injected here */}
    </div>
  );
};
