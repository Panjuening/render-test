const Filter=({searchQuery,setSearchQuery})=>
{
return(
<div>
   <input 
          value={searchQuery} 
          onChange={(e)=>setSearchQuery(e.target.value)} 
          placeholder="输入姓名搜索"
        />
    </div>
)}


export default Filter
