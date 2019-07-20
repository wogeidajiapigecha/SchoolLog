import api from '../../../static/ajax.js'
import axios from 'axios'

const teacherApi = {
  getClass: (teacherid, year) => (api.get(`/api/teacher/GetClassForTeacher?teacherid=${teacherid}&year=${year}`)),
  getStudents: (classid, date, year) => (api.get(`/api/teacher/GetClassInfo?classid=${classid}&date=${date}&year=${year}`)),
  postClass:(obj={})=>(api.post(`/api/teacher/DealClassInfo`,obj)),
};

export default teacherApi;
