
const $progressBar = document.getElementById("progressBar");
const $storageDetailContainer = document.getElementById("storageDetailContainer");

const $storageUsed = document.getElementById("storageUsed");
const $storageLeft = document.getElementById("storageLeft");

const $uploadFiles = document.getElementById("uploadFiles");

let fileSize = 100;

const storageDetail = {
    maxStorage: 1000,
    storageUsed: 0,
    setStorageUsed: function(fileSize){

        if(this.storageUsed !== this.maxStorage)
        this.storageUsed += fileSize;
        
    },
    setStorageLeft: function(){
        return this.maxStorage - this.storageUsed;
    }
}

const {storageUsed,  maxStorage} = storageDetail;
    
document.addEventListener("DOMContentLoaded", function() {
    
    const storageLeft = setStorageLeft();
    renderStorage(storageUsed);
    renderStorageLeft(storageLeft);
    changeProgressBarSize(storageUsed);
  });



$progressBar.addEventListener("mouseenter", () =>{

    console.log($storageDetailContainer);

    $storageDetailContainer.classList.add("active");
})

$progressBar.addEventListener("mouseout", () =>{

    console.log($storageDetailContainer);

    $storageDetailContainer.classList.remove("active");

})


$uploadFiles.addEventListener("click", () =>{
    
    renderStorageComponent(fileSize);

})

function renderStorageComponent(fileSizeValue = 0){
    storageDetail.setStorageUsed(fileSizeValue);
    
    renderStorage(storageDetail.storageUsed);

    const storageLeft = setStorageLeft();
    renderStorageLeft(storageLeft);
    changeProgressBarSize(storageDetail.storageUsed);
}

function setStorageLeft(){
    const storageLeft = maxStorage - storageDetail.storageUsed;

    return storageLeft;
}

function renderStorage(storage = 10){

    if(storageDetail.storageUsed >= storageDetail.maxStorage){
        $storageUsed.textContent = 1000 + " GB";
        errorMessageNoty("Warning", "You can´t upload more files, Do you want to delete some files?");
    }else{
        $storageUsed.textContent = storage + " GB";
    }

}

function renderStorageLeft(storageLeft = 0){


        if(storageDetail.storageUsed !== storageDetail.maxStorage)
            $storageLeft.innerHTML = `${storageLeft} <span>GB Left</span>`;
       else{
        $storageLeft.innerHTML = `0 <span>GB Left</span>`;
       }
}


function changeProgressBarSize(size = "10"){
    
    const progressBarSize = size / 10;

    document.documentElement.style
    .setProperty('--progressBarSize', progressBarSize+"%");
}



function errorMessageNoty(title, text){

    swal({
        title,
        text,
        icon: "error",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
         
          
          setTimeout(function(){
              storageDetail.storageUsed = 100;
        
            renderStorageComponent();
          }, 1000)
          setTimeout(function(){
              swal("Poof! Your imaginary file has been deleted!", {
                  icon: "success",
                });
          }, 3000)
        } else {
          swal("Your imaginary file is safe!");
        }
      });

}