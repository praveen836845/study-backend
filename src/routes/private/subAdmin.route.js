const subadminRoute = require("express").Router();
const { postJob } = require("../../controllers/jobPoster.controller");
const verifyUser = require("../../middleware/verifyToken");
const isJobPoster = require("../../middleware/isJobPoster.middleware");
const isInstitute = require("../../middleware/isIntitute.middleware");
const isHeadState = require("../../middleware/isHeadState.middleware");
const {
  createTeacher,
  getAllTeachers,
  addCourse,
  updateInstitute,
  subscribedUsers,
  updateInstituteProfile,
  getInstituteDetail,
  createInstitute,
  addCourseContent
} = require("../../controllers/institute.controller");

 const {
  addWorker,
  getWorkers,
  deleteWorker
 } = require("../../controllers/headState.controller");

 const {
  subadminLogin
 } = require("../../controllers/subadmin.controller");


 subadminRoute.post("/login", subadminLogin);

//------------------JObPoster----------------------------------
subadminRoute.post("/postjob", verifyUser, isJobPoster, postJob);

///---------------------headState----------------------------------

subadminRoute.post("/worker", verifyUser, isHeadState, addWorker);

subadminRoute.get("/workers", verifyUser, isHeadState, getWorkers);

subadminRoute.delete("/worker/:id", verifyUser, isHeadState, deleteWorker);

//-----------------------Institute---------------------------------

subadminRoute.put("/institute", verifyUser, isInstitute, updateInstituteProfile);

subadminRoute.post("/institute", verifyUser, isInstitute, createInstitute);

subadminRoute.get("/institute", verifyUser, isInstitute, getInstituteDetail);

subadminRoute.post("/teachers", verifyUser, isInstitute, createTeacher);

subadminRoute.get("/teachers", verifyUser, isInstitute, getAllTeachers);

subadminRoute.post("/course", verifyUser, isInstitute, addCourse);

// subadminRoute.post("/video",verifyUser, isInstitute, uploadVideoCourse);

// subadminRoute.get("/students", verifyUser, isInstitute, getStudentsSubscribed);

subadminRoute.post("/instituteProfile", verifyUser,isInstitute,updateInstitute);

subadminRoute.get("/subscribedUsers", verifyUser, isInstitute, subscribedUsers);

subadminRoute.post("/courseContent", verifyUser, isInstitute, addCourseContent)


module.exports = subadminRoute;
