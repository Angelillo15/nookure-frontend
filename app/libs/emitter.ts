import mitt from "mitt";

type Events = {
    nookureStaffBannerVisibilityChange: "hidden" | "visible";
};

const emitter = mitt<Events>();

export default emitter;