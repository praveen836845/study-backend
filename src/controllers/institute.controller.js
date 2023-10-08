const Institute = require("../model/institute.schema");
const Teacher = require("../model/teacher.schema");
const { encryptPassword} = require("../utils/commonFunctions");
const role= require("../model/role.model");
const Course  = require("../model/course.schema");
const Lecture = require("../model/lecture.schema");
const Package = require("../model/package.schema");
const CourseContent = require("../model/courseContent.schema");
const Review = require("../model/review.schema");
 const mongoose = require("mongoose");


const createTeacher = async (req, res) => {
  const teachersArray = req.body;
  if(teachersArray.length<=0){
    return res.status(400).send('Enter atleast a teacher');
  }

  for(let i=0; i<teachersArray.length; i++){
    const emailExists = await Teacher.find({
      email : teachersArray[i].email
    });
    console.log('emailExists  >', emailExists);
    if(emailExists.length>0){
      return res.status(400)
      .set("content-type" , "application/json")
      .send(JSON.stringify({
        mssg : `teacher with this email ${teachersArray[i].email} already exists`
      }));
    }

    const mobileExists = await Teacher.find({
      mobile : teachersArray[i].mobile
    });
    console.log(mobileExists);
    if(mobileExists.length>0){
      return res.status(400)
      .set("content-type" , "application/json")
      .send(JSON.stringify({
        mssg : `teacher with this number ${teachersArray[i].email} already exists`
      }));
    }

    const teacher = new Teacher({
      name : teachersArray[i].name,
      mobile : teachersArray[i].mobile,
      email : teachersArray[i].email,
      password : await encryptPassword(teachersArray[i].password),
      role : role.teacher,
      courseCreated : teachersArray[i].courseCreated,
      instituteAssociated : req.body.id,
      students: teachersArray[i].students,
    });

    try{
      const savedTeachers = await teacher.save();
      console.log(savedTeachers);
    }catch(err){
      return res.status(500)
      .set("content-type" , "application/json")
      .send(JSON.stringify({
        mssg : `some error occured ${err}`
      }));
    }

  }
  res.status(201)
  .set("content-type" , "application/json")
  .send(JSON.stringify({
    mssg : "teachers created successfully"
  }))  
};

const addCourse = async (req, res) => {
  const course = new Course({
    courseName : req.body.courseName,
    subtitle : req.body.subtitle,
    studentsEnrolled : req.body.studentsEnrolled,
    rating : req.body.rating,
    totalReviews : req.body.totalReviews,
    price : req.body.price,
    totalHours : req.body.totalHours,
    courseType : req.body.courseType,
    totalLectures : req.body.totalLectures,
    aboutCourse : req.body.aboutCourse,
    courseIntroLink : req.body.courseIntroLink,
    courseThumbnail : req.body.course0Thumbnail,
    language : req.body.language,
    authors : req.body.authors,
    instituteId : req.body.id,
    studentsEnrolled : req.body.studentsEnrolled,
    courseContent : req.body.courseContent
  });

  try{
    const savedCourse = await course.save();
    return res.status(201)
    .set("content-type", "application/json")
    .send(JSON.stringify({
      courseId : savedCourse._id
    }));
  }catch(err){
    return res.status(500).set("content-type", "application/json")
    .send(JSON.stringify({
      mssg : `some error occured ${err}`
    }));
  }
 
};

const getAllTeachers = async (req, res) => {
  const teachers = await Teacher.find({});
  return res.status(200).send(teachers);
};

const updateInstitute = (req, res) => {};

const subscribedUsers = (req, res) => {};

const updateInstituteProfile = (req, res) =>{

};

const createInstitute = async (req, res) =>{

  const intituteFound = await Institute.find({
    subadminId : req.body.id
  })
  console.log(intituteFound);

   if(intituteFound && intituteFound.length>0){
    return res.status(400).send({
      mssg : "Institute already exists"
    })
   }

  const institute = new Institute({
    intituteName : req.body.intituteName,
    location : req.body.location,
    instituteDescription : req.body.instituteDescription,
    teachersCount : req.body.teachersCount,
    studentCount : req.body.studentCount,
    studentsAssociated : req.body.studentsAssociated,
    teachersAssociated  : req.body.teachersAssociated,
    coursesOffered : req.body.coursesOffered,
    subadminId : req.body.id
  })

  try{
    const savedInstitute = await institute.save();
    await savedInstitute.populate("studentsAssociated");
    console.log(savedInstitute);
    res.status(201).send(savedInstitute);

  }catch(err){
    res.status(500).send({
      mssg : `error occurred ${err}`
    })
  }

   

};

const getInstituteDetail = async (req, res) =>{
  const institute = await Institute.find({
    subadminId : req.body.id
  }).populate("teachersAssociated", "studentsAssociated");

   return res.status(200).send(institute);
};

const addCourseContent = async (req, res) =>{

  let packageArray = [];
  let packageSize = req.body.package.length;
  for(let i=0; i<packageSize; i++){
    let lectureArray = [];
    let lectureSize = req.body.package[i].lectures.length;
    let lectureReq = req.body.package[i];
    for(let j=0; j<lectureSize; j++){
      const lecture = new Lecture({
        videoLink : lectureReq.lectures[j].videoLink,
        videoTitle : lectureReq.lectures[j].videoTitle,
        videoTime : lectureReq.lectures[j].videoTime,
        isFree : lectureReq.lectures[j].isFree,
      });
      const savedLecture = await lecture.save();
      lectureArray.push(savedLecture._id);
    }

    const package = new Package({
      packageName : req.body.package[i].packageName,
      totalVideosInPackage : req.body.package[i].totalVideosInPackage,
      totalDocuments : req.body.package[i].totalDocuments,
      totalTime: req.body.package[i].totalTime,
      lectures : lectureArray
    })

    const savedPackage = await package.save();
    packageArray.push(savedPackage._id);
  }

  let reviewArray = [];
  for(let i=0; i<req.body.reviews.length; i++){
    const tempReview = req.body.reviews[i];
    const review = new Review({
      reviewWriter : tempReview.reviewWriter,
      rating : tempReview.rating,
      review : tempReview.review,
      peopleFoundHelpful : tempReview.peopleFoundHelpful,
      reviewerProfile : tempReview.CoursereviewerProfile
    });

    const savedReview = await review.save();
    reviewArray.push(savedReview._id);
  }

  const courseContent = new CourseContent({
    courseId : req.body.courseId,
    courseName : req.body.courseName,
    isFree : req.body.isFree,
    aboutCourse : req.body.aboutCourse,
    description : req.body.description,
    authorName : req.body.authorName,
    authorDescription : req.body.authorDescription,
    package : packageArray,
    reviews : reviewArray
  });

  const savedContent = await courseContent.save();
  res.status(200).send("success");
};

module.exports = {
  createTeacher,
  addCourse,
  getAllTeachers,
  updateInstitute,
  subscribedUsers,
  updateInstituteProfile,
  getInstituteDetail,
  createInstitute,
  addCourseContent
  // getStudentsSubscribed
};
