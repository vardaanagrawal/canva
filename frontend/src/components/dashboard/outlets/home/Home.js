import React, { useEffect, useState } from "react";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// components
import ProjectCard from "../../utlis/projectCard/ProjectCard";
import SpinLoader from "../../../utils/spinLoader/SpinLoader";
// functions
import { createNewProject } from "../../../../redux/actions/projectActions";
import { newProjectsList } from "./utils";

// const newProjectsList = [
//   {
//     name: "Document (Landscape)",
//     height: 500,
//     width: 750,
//     bg_color: "#ffffff",
//   },
//   {
//     name: "Document (Portrait)",
//     height: 500,
//     width: 350,
//     bg_color: "#ffffff",
//   },
//   {
//     name: "Document (Square)",
//     height: 400,
//     width: 400,
//     bg_color: "#ffffff",
//   },
// ];

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const projects = useSelector((state) => state.projects).sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );
  const [loading, setLoading] = useState(-1);

  async function handleCreateNewProject(item) {
    const newProjectData = {
      height: item.height,
      width: item.width,
      bg_color: item.bg_color,
    };
    dispatch(createNewProject(newProjectData, navigate, setLoading));
  }

  const [projectCategory, setProjectCategory] = useState("For You");
  const [projectList, setProjectList] = useState(
    [].concat(...Object.values(newProjectsList))
  );

  useEffect(() => {
    if (projectCategory === "For You") {
      setProjectList([].concat(...Object.values(newProjectsList)));
    } else {
      setProjectList(newProjectsList[projectCategory]);
    }
  }, [projectCategory]);

  const [hover, setHover] = useState("");

  return (
    <div className="home">
      <div className="home-blue-box">
        <div className="blue-box-title">What will you design today?</div>
        <div className="blue-box-items">
          {[
            {
              img: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M11.26 7.49c0-.36-.35-.45-.35-.45-1.55-.49-2.49-1.43-2.98-2.99 0 0-.06-.34-.45-.34-.38 0-.44.34-.44.34-.49 1.56-1.42 2.5-2.98 2.99 0 0-.35.09-.35.45s.35.45.35.45c1.56.49 2.49 1.43 2.98 2.99 0 0 .06.34.45.34.38-.01.45-.34.45-.34.49-1.56 1.42-2.5 2.98-2.99 0 .01.34-.08.34-.45 0 .01 0 .01 0 0zm17.06 8.46c0-.53-.44-.88-.94-1 0 0-3.96-1.34-5.43-2.25-.98-.48-1.91-1.45-2.5-2.41v.01c-.89-1.16-2.39-5.73-2.39-5.73-.18-.59-.52-.93-1.05-.94v.04L16 3.63c-.53 0-.88.44-1 .94 0 0-1.34 3.96-2.25 5.43-.48.98-1.45 1.91-2.41 2.5h.01c-1.16.89-5.73 2.39-5.73 2.39-.59.18-.93.52-.94 1.05l.06.01h-.06c0 .53.44.88.94 1 0 0 3.96 1.34 5.43 2.25.98.48 1.91 1.45 2.5 2.41v-.01c.89 1.16 2.39 5.73 2.39 5.73.18.59.52.93 1.05.94l.01-.07.01.07c.53 0 .88-.44 1-.94 0 0 1.34-3.96 2.25-5.43.48-.98 1.45-1.91 2.41-2.5h-.01c1.16-.89 5.73-2.39 5.73-2.39.59-.18.93-.52.94-1.05l-.08-.01h.07zm-.26 8.99c-.47-.24-.92-.58-1.31-.97s-.73-.85-.97-1.31c0 0-.11-.24-.39-.24s-.39.24-.39.24c-.24.47-.58.92-.97 1.31s-.85.73-1.31.97c0 0-.24.11-.24.39s.24.39.24.39c.47.24.92.58 1.31.97s.73.85.97 1.31c0 0 .11.24.39.24s.39-.24.39-.24c.24-.47.58-.92.97-1.31s.85-.73 1.31-.97c0 0 .24-.11.24-.39s-.24-.39-.24-.39z"
                    fill="currentColor"
                  ></path>
                </svg>
              ),
              name: "For You",
              color: "lightblue",
            },
            {
              img: (
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.605 7.924c-.032-1.265-.746-2.4-1.784-3.113-.616-.422-1.362-.714-2.14-.714C20.67 4 18.627 4 16.584 4H13.47c-.032 0-.065.032-.097.032-1.362 0-2.724.033-4.087.065-2.043.065-3.794 1.817-3.892 3.827-.032 1.33-.097 5.74-.097 6.52 0 .745-.032 1.524 0 2.27 0 2.464.033 4.93.097 7.394.033 1.265.746 2.4 1.784 3.114.616.421 1.362.713 2.14.713C11.33 28 13.374 28 15.417 28h3.114c.032 0 .064-.032.097-.032 1.362 0 2.724-.033 4.086-.065 2.044-.065 3.795-1.816 3.892-3.827.033-1.33.033-2.692.065-4.022 0-.032.032-.097.032-.13v-2.367c0-.746.033-1.525 0-2.27 0-2.465-.032-4.898-.097-7.363Zm-15.373 7.46c.714 0 1.33.584 1.33 1.297 0 .714-.584 1.297-1.33 1.297-.713 0-1.33-.583-1.33-1.297 0-.713.584-1.297 1.33-1.297ZM9.935 12.95c0-.713.584-1.297 1.33-1.297h9.47c.746 0 1.33.584 1.33 1.297 0 .714-.584 1.298-1.33 1.298h-9.47c-.746.032-1.33-.552-1.33-1.298ZM20.832 23.46H11.135c-1.135 0-1.557-1.07-.973-1.945l1.297-1.979c.552-.875 1.979-.875 2.53 0l.616.94 2.011-3.08c.551-.876 1.978-.876 2.53 0l2.66 4.119c.583.875.129 1.945-.974 1.945Zm-.097-12.94h-9.503c-.746 0-1.33-.584-1.33-1.297 0-.714.584-1.298 1.33-1.298h9.503c.746 0 1.33.584 1.33 1.298 0 .713-.584 1.297-1.33 1.297Z"
                    fill="currentColor"
                  ></path>
                </svg>
              ),
              name: "Docs",
              color: "purple",
            },
            {
              img: (
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M27.924 8.454c-.032-1.15-.608-2.174-1.471-2.877-.672-.544-1.471-.895-2.366-.96a226.297 226.297 0 0 0-8.09-.127c-2.717 0-5.403.032-8.088.128-.864.032-1.663.383-2.334.927-.864.703-1.471 1.758-1.503 2.91a185.346 185.346 0 0 0 0 10.327c.064 2.014 1.79 3.772 3.837 3.836 1.534.064 3.037.064 4.572.064l-2.046 3.645c-.288.543.095 1.183.67 1.183h1.727a.78.78 0 0 0 .672-.384l.224-.383 1.534-2.718a.901.901 0 0 1 1.567 0l1.726 3.101c.128.256.384.384.672.384h1.726c.576 0 .96-.64.672-1.151l-.64-1.12-1.406-2.525c1.502-.032 3.037-.032 4.54-.064 2.014-.064 3.773-1.822 3.836-3.837.064-3.453.064-6.906-.031-10.359ZM15.998 18.43c-2.622 0-4.764-2.142-4.764-4.796 0-2.654 2.142-4.796 4.764-4.796v4.796h4.796a4.79 4.79 0 0 1-4.796 4.796Zm1.087-5.883V7.75c2.621 0 4.796 2.142 4.796 4.796h-4.796Z"
                    fill="currentColor"
                  ></path>
                </svg>
              ),
              name: "Presentations",
              color: "orange",
            },
            {
              img: (
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M27.928 8.7c-.095-2.004-1.813-3.722-3.817-3.817-5.344-.191-10.783-.191-16.222 0-2.004.095-3.722 1.813-3.817 3.817-.096 3.435-.096 6.87 0 10.306.095 2.004 1.813 3.722 3.817 3.817 1.336 0 2.672 0 4.008.095l2.385 3.34c.955 1.336 2.481 1.336 3.436 0l2.385-3.34c1.336 0 2.672 0 4.008-.095 2.004-.095 3.722-1.813 3.817-3.817.096-3.467.096-6.903 0-10.306Zm-6.234 5.216a3.522 3.522 0 0 1-.445.923c-.287.509-1.464 2.131-4.581 4.421h-1.304c-2.418-1.78-3.658-3.149-4.23-3.912a5.85 5.85 0 0 1-.287-.382v-.032l-.032-.031a2.693 2.693 0 0 1-.477-.955 2.726 2.726 0 0 1-.16-.859c0-.19.033-.35.064-.508.128-.668.446-1.241.891-1.686a2.93 2.93 0 0 1 2.1-.86c1.208 0 2.258.732 2.735 1.75H16a3.042 3.042 0 0 1 2.736-1.75 3.054 3.054 0 0 1 3.053 3.054c.032.287-.032.573-.095.827Z"
                    fill="currentColor"
                  ></path>
                </svg>
              ),
              name: "Social Media",
              color: "red",
            },
            {
              img: (
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M27.979 13.771c-.064-2.02-1.796-3.784-3.816-3.848h-.032V7.422a.757.757 0 0 0-.225-.513l-2.533-2.534a.757.757 0 0 0-.513-.224H10.085a2.217 2.217 0 0 0-2.213 2.213v3.56H7.84c-2.02.063-3.784 1.827-3.816 3.847a285.195 285.195 0 0 0 0 7.408c.064 2.02 1.796 3.784 3.816 3.848h.032v.61c0 1.218.994 2.212 2.213 2.212h11.801a2.217 2.217 0 0 0 2.213-2.212v-.61h.032c2.02-.064 3.784-1.828 3.816-3.848.064-1.956.064-5.42.032-7.408ZM9.155 17.844c-.481-.032-.93-.449-.93-.93a16.777 16.777 0 0 1 0-1.796c.032-.48.449-.93.93-.93.61-.032 1.187-.032 1.796 0 .48.032.93.45.93.93.032.61.032 1.187 0 1.796-.032.481-.45.93-.93.93a16.81 16.81 0 0 1-1.796 0Zm12.699 7.023a.746.746 0 0 1-.738.738h-10.23a.746.746 0 0 1-.737-.738v-2.149h11.705v2.149Zm0-13.308H10.117V7.133c0-.417.353-.737.738-.737h8.08v2.886h2.887v2.277h.032Z"
                    fill="currentColor"
                  ></path>
                </svg>
              ),
              name: "Print Products",
              color: "green",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="blue-box-btn"
              onClick={() => {
                setProjectCategory(item.name);
              }}
              onMouseEnter={() => {
                setHover(item.name);
              }}
              onMouseLeave={() => {
                setHover("");
              }}
            >
              <div
                className="blue-box-btn-img"
                style={{
                  color:
                    projectCategory === item.name || hover === item.name
                      ? "white"
                      : item.color,
                  backgroundColor:
                    projectCategory === item.name || hover === item.name
                      ? item.color
                      : "white",
                }}
              >
                {item.img}
              </div>
              <div className="blue-box-btn-text">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="home-item-head">Create New Project</div>
      <div className="home-item">
        <div className="home-item-body">
          {projectList.map((item, index) => (
            <div className="home-project-item" key={index}>
              <div
                className="home-project-item-img"
                onClick={() => {
                  if (loading === -1) {
                    setLoading(index);
                    handleCreateNewProject(item);
                  }
                }}
                style={{ position: "relative", overflow: "hidden" }}
              >
                <img
                  src={item.thumbnail}
                  alt=""
                  style={{ height: "100%", width: "100%" }}
                ></img>
                {loading === index && (
                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#11111180",
                      position: "absolute",
                    }}
                  >
                    <SpinLoader height={30} width={30} color={"white"} />
                  </div>
                )}
              </div>
              <div className="home-project-item-name">{item.name}</div>
              <div className="home-project-item-dimension">
                {item.width} X {item.height}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="home-item-head">Recent Projects</div>
      <div className="home-item">
        {projects.length === 0 && (
          <div className="no-project-box">
            <img
              src="https://static.canva.com/web/images/1d5a272ab76b3d9d708b6e7bf3142da3.png"
              alt=""
            ></img>
            <div>Designs you create will be shown here.</div>
          </div>
        )}
        {projects.length > 0 && (
          <div className="home-item-body">
            {projects.slice(0, 5).map((item) => (
              <div className="home-project-item" key={item._id}>
                <ProjectCard project={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
