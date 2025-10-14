import Home from "./Home"

function NewCars() {
  return (
    <div className=" ">
      <div className="d-flex justify-content-center gap-5 mt-5">
        <input type="text" name="" id="search" className='rounded-4 p-2 border border-secondary border-3' placeholder='Search Old Cars By Name and Company' style={{minWidth:"30vw"}} />
        <div className="btn btn-success">Search</div>
      </div>
        
        <Home/>
        
    </div>
  )
}

export default NewCars