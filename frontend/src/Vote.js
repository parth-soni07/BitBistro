import React from "react";
import "./css/previouslyPostedStyles.css";

const Vote = () => {
  // Sample data for previously posted projects
  const previouslyPostedProjects = [
    {
      id: 1,
      name: "Project Name 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis interdum dictum tortor. Donec vitae massa sit amet magna fermentum congue. Suspendisse tristique risus non elit eleifend egestas.",
      metrics:
        "Donec lobortis est at sem interdum, nec congue purus euismod. Aliquam a ex finibus, luctus ligula nec, feugiat erat. Vestibulum quis tempor lectus. Cras ac massa sit amet purus tempus malesuada. Cras iaculis orci vel ligula porttitor tincidunt. Fusce commodo vehicula dolor. Phasellus at est nec ex blandit posuere. Aenean tempor elit sed est interdum, sodales gravida urna consectetur.",
      link: "abc.com",
      Descrepency: "Description of what went wrong",
    },
    {
      id: 2,
      name: "Project Name 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis interdum dictum tortor. Donec vitae massa sit amet magna fermentum congue. Suspendisse tristique risus non elit eleifend egestas. Donec lobortis est at sem interdum, ",
      metrics:
        "Donec lobortis est at sem interdum, nec congue purus euismod. Aliquam a ex finibus, luctus ligula nec, feugiat erat. Vestibulum quis tempor lectus. Cras ac massa sit amet purus tempus malesuada. Cras iaculis orci vel ligula porttitor tincidunt. Fusce commodo vehicula dolor. Phasellus at est nec ex blandit posuere. Aenean tempor elit sed est interdum, sodales gravida urna consectetur.",
      link: "abc.com",
      Descrepency: "Description of what went wrong",
    },
  ];

  return (
    <div className="previously-posted-container">
      <h1 className="heading">
        DAO <span className="span-h1">Voting </span>
      </h1>
      <div className="project-cards">
        {previouslyPostedProjects.map((project) => (
          <div className="prev-project-card" key={project.id}>
            <div className="h2-div">
              <h2 className="project-name">{project.name}</h2>
            </div>
            <p className="project-description">
              <span>Project Description: </span>
              {project.description}
            </p>

            <p className="project-metrics">
              {" "}
              <span>Project Metrics:</span> {project.metrics}
            </p>
            <p>Problem: {project.Descrepency}</p>
            <p>Link: {project.link}</p>

            <div className="button-container">
              <button className="negative-button">
                Negative (In favour of Owner)
              </button>
              <button className="positive-button">
                Positive (In favour of Freelancer)
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vote;
