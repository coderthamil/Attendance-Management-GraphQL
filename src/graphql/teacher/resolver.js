const attendance_model = require("../../database/models/attendance_model");
const schedule_model = require("../../database/models/schedule_model");
const student_model = require("../../database/models/student_model");
const teacher_model = require("../../database/models/teacher_model"); // <-- added
const bcrypt = require("bcryptjs");

module.exports = {
  Query: {
    // Dashboard summary
    async getDashboard() {
      const total_students = await student_model.count();
      const total_classes = await schedule_model.count();
      const total_schedules = await schedule_model.count(); // adjust if you have a separate schedules table
      const total_attendance = await attendance_model.count();
      const present_count = await attendance_model.count({
        where: { status: true },
      });

      return {
        total_students,
        total_classes,
        total_schedules,
        attendance_rate: total_attendance
          ? present_count / total_attendance
          : 0,
      };
    },

    async getAttendance(_, { class: className, date }) {
      const where = {};
      if (className) where.class = className;
      if (date) where.date = date;

      const attendance = await attendance_model.findAll({ where }); // <-- fixed
      return attendance
    },

    async getStudents(_,{className, name}){
       const students = await student_model.findAll()
      return students
    }
  },

  Mutation: {
    async addTeacher(_, { username, password, role }) {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const teacher = await teacher_model.create({
          username,
          password: hashedPassword,
          role,
        });

        return teacher;
      } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
          throw new Error("Username already exists");
        }
        console.error("Error creating teacher:", error);
        throw new Error("Failed to create teacher");
      }
    },
  //    addStudent(
  //   teacher_id: ID!
  //   roll_no: String!
  //   name: String!
  //   class:String
  //   contact: String
  // ): Student

    async addStudent(_, { teacher_id, roll_no, name,className, contact }) {
      const student = await student_model.create({
        teacher_id,
        roll_no,
        name,
        className,
        contact,
      });
      return student
      const students = await student_model.findAll()
      return students

    },

    async addSchedule(_, { class: className, day, period, subject, time, teacher }) {
      const schedule =await schedule_model.create({
        class: className,
        day,
        period,
        subject,
        time,
        teacher,
      });
      return schedule
    },

    async markAttendance(_, { roll_no,className, date, name, status }) {
      const attendance = await attendance_model.create({
        roll_no, 
        className,
        date,
        name,
        status,
      });
      return attendance
    },

    async updateStudent(_, { id, roll_no, name, contact }) {
      const student = await student_model.findByPk(id);
      if (!student) throw new Error("Student not found");
      await student.update({ roll_no, name, contact });
      return student;
    },

    async deleteStudent(_, { id }) {
      const deleted = await student_model.destroy({ where: { id } });
      return deleted
        ? { success: true, message: "Student deleted successfully" }
        : { success: false, message: "Student not found" };
    },
  },
};