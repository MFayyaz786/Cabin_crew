var ids=[];
const addUser=async(userId:any,socketId:any)=>{
ids.push({userId,socketId});
console.log(ids)
}
const deleteUser=async(socketId:any)=>{
 ids = ids.filter((id) => socketId !== id.socketId);
  console.log(ids)}
export default {addUser,deleteUser}