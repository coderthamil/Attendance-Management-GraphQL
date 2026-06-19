const { gql } = require("apollo-server-express");

module.exports = gql`
  type Principal {
    id: ID!
    username: String!
    password: String!
    role: String!   # fixed as "Principal"
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
    className: String   # e.g. "10 A"
  }

  type Class {
    id: ID!
    name: String!
    teacher_id: ID!
    day: String
    period: String
    subject: String
  }

  type Attendance {
    id: ID!
    student_id: ID!
    date: Date   # format dd-mm-yyyy
    status: Boolean! # true = Present, false = Absent
  }

  type Query {
    getDashboard: Dashboard
    getStudents(className: String, name: String): [Student]
    getClass(name: String): [Class]
    getAttendance(date: String): [Attendance]
  }

  type Mutation {
    addPrincipal(
      username: String!
      password: String!
      role: String!
    ): Principal
  }
`;