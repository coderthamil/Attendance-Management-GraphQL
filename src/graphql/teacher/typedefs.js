// src/graphql/teacher/typedef.js

const { gql } = require("apollo-server-express");

module.exports= gql`

scalar Time
scalar Date

type Teacher {
  id: ID!
  username: String!
  password: String!
  role: String!
}

type Dashboard {
  total_students: Int!
  total_classes: Int!
  total_schedules: Int!
  attendance_rate: Float!
}

type Student {
  id: ID!
  teacher_id: ID!
  roll_no: String!
  name: String!
  contact: String
}

type UpdateStudent {
  id: ID!
  roll_no: String
  name: String
  contact: String
}

type DeleteStudentResponse {
  success: Boolean!
  message: String
}

type Schedule {
  id: ID!
  class: String!
  day: String!
  period: String!
  subject: String!
  time: Time
  teacher: String!
}

type Attendance {
  id: ID!
  roll_no: String!
  name: String!
  date: Date
  status: Boolean! # true = Present, false = Absent
}

type Query {
  getDashboard: Dashboard
  getStudents:[Student]
  getAttendance(class: String, date: Date): [Attendance]
}

type Mutation {
  # Teacher
  addTeacher(username: String!, password: String!, role: String!): Teacher

  # Student
  addStudent(
    teacher_id: ID!
    roll_no: String!
    name: String!
    className:String
    contact: String
  ): Student

  updateStudent(
    id: ID!
    roll_no: String
    name: String
    contact: String
  ): UpdateStudent

  deleteStudent(id: ID!): DeleteStudentResponse

  # Schedule
  addSchedule(
    class: String!
    day: String!
    period: String!
    subject: String!
    time: String
    teacher: String!
  ): Schedule

  # Attendance
  markAttendance(
    roll_no: String!
    className:String
    date: Date
    name: String!
    status: Boolean!
  ): Attendance
}
`;
