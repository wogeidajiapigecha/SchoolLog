import api from '../../../static/ajax.js'

const schoolApi={
  getDivisionNum:(schoolid,date,year)=>(api.get(`/api/school/GetDivisionCount?date=${date}&year=${year}&schoolid=${schoolid}`)),
  getStudents:(schoolid,date,year)=>(api.get(`/api/school/GetStudentsNum?schoolid=${schoolid}&date=${date}&year=${year}`)),
  getDivisionList:(schoolid,date,year)=>(api.get(`/api/school/GetDivisionList?schoolid=${schoolid}&date=${date}&year=${year}`)),
};

export default schoolApi;
