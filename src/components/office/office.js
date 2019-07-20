import api from '../../../static/ajax.js'

const officeApi={
  getDivision:(manageid,year)=>(api.get(`/api/office/GetDivisionForOffice?manageid=${manageid}&year=${year}`)),
  getTeachers:(divisionid,date,year)=>(api.get(`/api/office/GetDivisionInfo?divisionid=${divisionid}&date=${date}&year=${year}`)),
  postDivision:(obj={})=>(api.post(`/api/office/DealDivisionInfo`,obj)),
  getClassList:(divisionid,date,year)=>(api.get(`/api/office/GetClassList?divisionid=${divisionid}&date=${date}&year=${year}`)),
}

export default officeApi
