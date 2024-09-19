import React, { useEffect, useRef, useState } from "react";
import {
  HamburgerIcon,
  HomeIcon,
  PlusIcon,
  XIcon,
} from "../../../../utils/icons";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { saveProject } from "../../../../redux/actions/x5ProjectActions";
import SpinLoader from "../../../../utils/SpinLoader";
import { createNewProject } from "../../../../redux/actions/x2ProjectsActions";

import domtoimage from "dom-to-image";

export default function LeftBarBtn() {
  const [leftBar, setLeftBar] = useState(false);
  // function to close left bar -----------------------------------------------------------
  function closeLeftBar() {
    const left_bar = document.querySelector(".left-bar");
    if (left_bar) {
      left_bar.style.left = "-350px";
    }
    setTimeout(() => {
      setLeftBar(false);
    }, 200);
  }

  return (
    <div>
      <div
        className="dn-mobile-menu-btn"
        onClick={() => {
          setLeftBar(true);
        }}
      >
        <HamburgerIcon />
      </div>
      {leftBar && (
        <div
          className="left-bar-page"
          onClick={(e) => {
            if (e.target.className === "left-bar-page") {
              closeLeftBar();
            }
          }}
        >
          <LeftBar closeLeftBar={closeLeftBar} />
        </div>
      )}
    </div>
  );
}

function LeftBar({ closeLeftBar }) {
  useEffect(() => {
    setTimeout(() => {
      document.querySelector(".left-bar").style.left = "0px";
    }, 100);
  }, []);

  const projects = useSelector((state) => state.projects);
  const location = useLocation();
  const projectId = location.pathname.split("/")[2];

  const [create, setCreate] = useState(false);
  const [hover, setHover] = useState(-1);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);
  const [homing, setHoming] = useState(false);
  // function of home button ---------------------------------------------------------------
  const handleHome = async () => {
    setHoming(true);
    const canvas = document.querySelector(".page-container");
    domtoimage
      .toPng(canvas)
      .then(async function (dataUrl) {
        await dispatch(saveProject(dataUrl, project));
        setHoming(false);
        navigate("/");
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  const cbRef = useRef(null); // create button ref
  const cdRef = useRef(null); // create dropdown ref
  const handleClickOutside = (event) => {
    if (
      cdRef.current && // tells us that whether the create dropdown  is open or not
      !cdRef.current.contains(event.target) && // tells us whether clicked item is create dropdown or not
      !cbRef.current.contains(event.target) // tells us whether clicked item is create button or not
    ) {
      setCreate(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);

  const [loading, setLoading] = useState(-1);
  async function handleCreateNewProject(item) {
    const newProjectData = {
      height: item.height,
      width: item.width,
      bg_color: item.bg_color,
      project_type: item.name,
    };
    await dispatch(createNewProject(newProjectData, navigate));
    setLoading(-1);
    setCreate(false);
  }

  return (
    <div className="left-bar">
      <div className="left-bar-head">
        <div className="left-bar-logo">
          <img
            src="https://static.canva.com/web/images/8439b51bb7a19f6e65ce1064bc37c197.svg"
            alt=""
            style={{height: "40px"}}
          ></img>
        </div>
        <div className="left-bar-close-btn" onClick={closeLeftBar}>
          <XIcon />
        </div>
      </div>
      <div
        className="left-bar-create-btn"
        onClick={() => {
          setCreate(!create);
        }}
        ref={cbRef}
      >
        <PlusIcon />
        Create a design
      </div>
      <div className="left-bar-body">
        {create && (
          <div className="left-bar-create-list" ref={cdRef}>
            {newProjectsList.map((item, index) => (
              <div
                key={index}
                className="left-bar-create-item"
                onMouseEnter={() => {
                  setHover(index);
                }}
                onMouseLeave={() => {
                  setHover(-1);
                }}
                onClick={() => {
                  setLoading(index);
                  handleCreateNewProject(item);
                }}
              >
                <div>
                  {loading === index ? (
                    <SpinLoader color="black" height={18} width={18} />
                  ) : (
                    item.icon
                  )}
                </div>
                <div>{item.name}</div>
                <div className="left-bar-create-item-size">
                  {hover === index && item.width + "px x " + item.height + "px"}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="left-bar-item" onClick={handleHome}>
          {homing ? (
            <SpinLoader color="black" height={18} width={18} />
          ) : (
            <HomeIcon />
          )}{" "}
          Home
        </div>
        <div className="left-bar-label">Projects</div>
        {projects.map((item, index) => (
          <div
            key={item._id}
            className="left-bar-item"
            style={{
              backgroundColor: projectId === item._id && "rgb(225 228 231)",
            }}
            onClick={() => {
              window.open(`/design/${item._id}/edit`, "_blank");
            }}
          >
            {iconsList[item.project_type]}
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}

const icons = {
  docs: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.605 7.924c-.032-1.265-.746-2.4-1.784-3.113-.616-.422-1.362-.714-2.14-.714C20.67 4 18.627 4 16.584 4H13.47c-.032 0-.065.032-.097.032-1.362 0-2.724.033-4.087.065-2.043.065-3.794 1.817-3.892 3.827-.032 1.33-.097 5.74-.097 6.52 0 .745-.032 1.524 0 2.27 0 2.464.033 4.93.097 7.394.033 1.265.746 2.4 1.784 3.114.616.421 1.362.713 2.14.713C11.33 28 13.374 28 15.417 28h3.114c.032 0 .064-.032.097-.032 1.362 0 2.724-.033 4.086-.065 2.044-.065 3.795-1.816 3.892-3.827.033-1.33.033-2.692.065-4.022 0-.032.032-.097.032-.13v-2.367c0-.746.033-1.525 0-2.27 0-2.465-.032-4.898-.097-7.363Zm-15.373 7.46c.714 0 1.33.584 1.33 1.297 0 .714-.584 1.297-1.33 1.297-.713 0-1.33-.583-1.33-1.297 0-.713.584-1.297 1.33-1.297ZM9.935 12.95c0-.713.584-1.297 1.33-1.297h9.47c.746 0 1.33.584 1.33 1.297 0 .714-.584 1.298-1.33 1.298h-9.47c-.746.032-1.33-.552-1.33-1.298ZM20.832 23.46H11.135c-1.135 0-1.557-1.07-.973-1.945l1.297-1.979c.552-.875 1.979-.875 2.53 0l.616.94 2.011-3.08c.551-.876 1.978-.876 2.53 0l2.66 4.119c.583.875.129 1.945-.974 1.945Zm-.097-12.94h-9.503c-.746 0-1.33-.584-1.33-1.297 0-.714.584-1.298 1.33-1.298h9.503c.746 0 1.33.584 1.33 1.298 0 .713-.584 1.297-1.33 1.297Z"
        fill="purple"
      ></path>
    </svg>
  ),
  presentation: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.924 8.454c-.032-1.15-.608-2.174-1.471-2.877-.672-.544-1.471-.895-2.366-.96a226.297 226.297 0 0 0-8.09-.127c-2.717 0-5.403.032-8.088.128-.864.032-1.663.383-2.334.927-.864.703-1.471 1.758-1.503 2.91a185.346 185.346 0 0 0 0 10.327c.064 2.014 1.79 3.772 3.837 3.836 1.534.064 3.037.064 4.572.064l-2.046 3.645c-.288.543.095 1.183.67 1.183h1.727a.78.78 0 0 0 .672-.384l.224-.383 1.534-2.718a.901.901 0 0 1 1.567 0l1.726 3.101c.128.256.384.384.672.384h1.726c.576 0 .96-.64.672-1.151l-.64-1.12-1.406-2.525c1.502-.032 3.037-.032 4.54-.064 2.014-.064 3.773-1.822 3.836-3.837.064-3.453.064-6.906-.031-10.359ZM15.998 18.43c-2.622 0-4.764-2.142-4.764-4.796 0-2.654 2.142-4.796 4.764-4.796v4.796h4.796a4.79 4.79 0 0 1-4.796 4.796Zm1.087-5.883V7.75c2.621 0 4.796 2.142 4.796 4.796h-4.796Z"
        fill="orange"
      ></path>
    </svg>
  ),
  social: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.928 8.7c-.095-2.004-1.813-3.722-3.817-3.817-5.344-.191-10.783-.191-16.222 0-2.004.095-3.722 1.813-3.817 3.817-.096 3.435-.096 6.87 0 10.306.095 2.004 1.813 3.722 3.817 3.817 1.336 0 2.672 0 4.008.095l2.385 3.34c.955 1.336 2.481 1.336 3.436 0l2.385-3.34c1.336 0 2.672 0 4.008-.095 2.004-.095 3.722-1.813 3.817-3.817.096-3.467.096-6.903 0-10.306Zm-6.234 5.216a3.522 3.522 0 0 1-.445.923c-.287.509-1.464 2.131-4.581 4.421h-1.304c-2.418-1.78-3.658-3.149-4.23-3.912a5.85 5.85 0 0 1-.287-.382v-.032l-.032-.031a2.693 2.693 0 0 1-.477-.955 2.726 2.726 0 0 1-.16-.859c0-.19.033-.35.064-.508.128-.668.446-1.241.891-1.686a2.93 2.93 0 0 1 2.1-.86c1.208 0 2.258.732 2.735 1.75H16a3.042 3.042 0 0 1 2.736-1.75 3.054 3.054 0 0 1 3.053 3.054c.032.287-.032.573-.095.827Z"
        fill="red"
      ></path>
    </svg>
  ),
  print: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.979 13.771c-.064-2.02-1.796-3.784-3.816-3.848h-.032V7.422a.757.757 0 0 0-.225-.513l-2.533-2.534a.757.757 0 0 0-.513-.224H10.085a2.217 2.217 0 0 0-2.213 2.213v3.56H7.84c-2.02.063-3.784 1.827-3.816 3.847a285.195 285.195 0 0 0 0 7.408c.064 2.02 1.796 3.784 3.816 3.848h.032v.61c0 1.218.994 2.212 2.213 2.212h11.801a2.217 2.217 0 0 0 2.213-2.212v-.61h.032c2.02-.064 3.784-1.828 3.816-3.848.064-1.956.064-5.42.032-7.408ZM9.155 17.844c-.481-.032-.93-.449-.93-.93a16.777 16.777 0 0 1 0-1.796c.032-.48.449-.93.93-.93.61-.032 1.187-.032 1.796 0 .48.032.93.45.93.93.032.61.032 1.187 0 1.796-.032.481-.45.93-.93.93a16.81 16.81 0 0 1-1.796 0Zm12.699 7.023a.746.746 0 0 1-.738.738h-10.23a.746.746 0 0 1-.737-.738v-2.149h11.705v2.149Zm0-13.308H10.117V7.133c0-.417.353-.737.738-.737h8.08v2.886h2.887v2.277h.032Z"
        fill="green"
      ></path>
    </svg>
  ),
};

export const iconsList = {
  "Document (Landscape)": icons.docs,
  "Document (Portrait)": icons.docs,
  "Document (Square)": icons.docs,
  "Presentation (16:9)": icons.presentation,
  "Presentation (Mobile First)": icons.presentation,
  "Presentation (4:3)": icons.presentation,
  "Instagram Post (Sqaue)": icons.social,
  "Facebook Post": icons.social,
  "Instagram Story": icons.social,
  "Facebook Cover": icons.social,
  "Youtube Thumbnail": icons.socia,
  "Twitter Post": icons.social,
  Postcard: icons.print,
  Flyer: icons.print,
  "Poster (Portrait)": icons.print,
  "Gift Card": icons.print,
};

const newProjectsList = [
  {
    name: "Document (Landscape)",
    height: 500,
    width: 750,
    bg_color: "#ffffff",
    thumbnail:
      "https://res.cloudinary.com/dg1awjvew/image/upload/v1704542383/canva/Thumbnails/Document_Landscape_bbazxf.png",
    icon: icons.docs,
  },
  {
    name: "Document (Portrait)",
    height: 500,
    width: 350,
    bg_color: "#ffffff",
    thumbnail:
      "https://res.cloudinary.com/dg1awjvew/image/upload/v1704542383/canva/Thumbnails/Document_Portrait_r10926.png",
    icon: icons.docs,
  },
  {
    name: "Document (Square)",
    height: 400,
    width: 400,
    bg_color: "#ffffff",
    thumbnail:
      "https://res.cloudinary.com/dg1awjvew/image/upload/v1704542383/canva/Thumbnails/Document_Square_djsajj.png",
    icon: icons.docs,
  },
  {
    name: "Presentation (16:9)",
    height: 1080,
    width: 1920,
    bg_color: "#ffffff",
    thumbnail:
      "https://res.cloudinary.com/dg1awjvew/image/upload/v1704542385/canva/Thumbnails/Presentation_16-9_hbsgrc.png",
    icon: icons.presentation,
  },
  {
    name: "Presentation (Mobile First)",
    height: 1920,
    width: 1080,
    bg_color: "#ffffff",
    thumbnail:
      "https://res.cloudinary.com/dg1awjvew/image/upload/v1704542386/canva/Thumbnails/Presentation_Mobile_First_hj4ykz.png",
    icon: icons.presentation,
  },
  {
    name: "Presentation (4:3)",
    height: 768,
    width: 1024,
    bg_color: "#ffffff",
    thumbnail:
      "https://res.cloudinary.com/dg1awjvew/image/upload/v1704542622/canva/Thumbnails/Presentation_4-3_neb6sg.png",
    icon: icons.presentation,
  },
  {
    name: "Instagram Post (Sqaue)",
    height: 1080,
    width: 1080,
    bg_color: "#ffffff",
    thumbnail:
      "https://res.cloudinary.com/dg1awjvew/image/upload/v1704542384/canva/Thumbnails/Insta_Post_sre0v8.png",
    icon: icons.social,
  },
  {
    name: "Facebook Post",
    height: 788,
    width: 940,
    bg_color: "#ffffff",
    thumbnail:
      "https://res.cloudinary.com/dg1awjvew/image/upload/v1704542383/canva/Thumbnails/Facebook_Post_xgge51.png",
    icon: icons.social,
  },
  {
    name: "Instagram Story",
    height: 1920,
    width: 1080,
    bg_color: "#ffffff",
    thumbnail:
      "https://res.cloudinary.com/dg1awjvew/image/upload/v1704542384/canva/Thumbnails/Insta_Story_a17rh1.png",
    icon: icons.social,
  },
  {
    name: "Facebook Cover",
    height: 924,
    width: 1640,
    bg_color: "#ffffff",
    thumbnail:
      "https://res.cloudinary.com/dg1awjvew/image/upload/v1704542383/canva/Thumbnails/Facebook_Cover_o0bf8t.png",
    icon: icons.social,
  },
  {
    name: "Youtube Thumbnail",
    height: 720,
    width: 1280,
    bg_color: "#ffffff",
    thumbnail:
      "https://res.cloudinary.com/dg1awjvew/image/upload/v1704542386/canva/Thumbnails/Youtube_thumbnail_ed0tz1.png",
    icon: icons.social,
  },
  {
    name: "Twitter Post",
    height: 900,
    width: 1600,
    bg_color: "#ffffff",
    thumbnail:
      "https://res.cloudinary.com/dg1awjvew/image/upload/v1704542386/canva/Thumbnails/Twitter_Post_i725pm.png",
    icon: icons.social,
  },
  {
    name: "Postcard",
    height: 1050,
    width: 1480,
    bg_color: "#ffffff",
    thumbnail:
      "https://res.cloudinary.com/dg1awjvew/image/upload/v1704542384/canva/Thumbnails/Postcard_xo5qyk.png",
    icon: icons.print,
  },
  {
    name: "Flyer",
    height: 742,
    width: 525,
    bg_color: "#ffffff",
    thumbnail:
      "https://res.cloudinary.com/dg1awjvew/image/upload/v1704542383/canva/Thumbnails/Flyer_xi2mqc.png",
    icon: icons.print,
  },
  {
    name: "Poster (Portrait)",
    height: 594,
    width: 420,
    bg_color: "#ffffff",
    thumbnail:
      "https://res.cloudinary.com/dg1awjvew/image/upload/v1704542384/canva/Thumbnails/Poster_uu0c7e.png",
    icon: icons.print,
  },
  {
    name: "Gift Card",
    height: 210,
    width: 296,
    bg_color: "#ffffff",
    thumbnail:
      "https://res.cloudinary.com/dg1awjvew/image/upload/v1704542383/canva/Thumbnails/Gift_Card_jjyd2i.png",
    icon: icons.print,
  },
];
