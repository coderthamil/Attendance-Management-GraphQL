const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

// Sequelize models
const student_model = require("../../database/models/student_model");
const schedule_model = require("../../database/models/schedule_model");
const attendance_model = require("../../database/models/attendance_model");
const teacher_model = require("../../database/models/teacher_model");

module.exports = {
  Query: {
    async getDashboard() {
      const total_students = await student_model.count();
      const total_classes = await schedule_model.count();
      const total_schedules = await schedule_model.count();
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

      return await attendance_model.findAll({ where });
    },

    async getStudents(_, { className, name }) {
      const students = await student_model.findAll();
      return students;
    },
  },

  Mutation: {
    async addPrincipal(_, { username, password, role }) {
      try {
        //  Input validation
        if (!username || !password) {
          throw new Error("Username and password are required");
        }

        if (password.length < 6) {
          throw new Error("Password must be at least 6 characters long");
        }

        //  Duplicate check
        const existingPrincipal = await teacher_model.findOne({
          where: { username },
        });

        if (existingPrincipal) {
          throw new Error("Principal with this username already exists");
        }

        //  Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //  Create new principal
        const principal = await teacher_model.create({
          username,
          password: hashedPassword,
          role: role || "Principal",
        });

        return principal;
      } catch (error) {
        console.error("Error creating principal:", error);
        throw new Error(error.message || "Failed to create principal");
      }
    },
  },
};
