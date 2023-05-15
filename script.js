var students = [
  {
    name: "Valeria Orosco Rodriguez",
    semester: 1,
    program: "ingenieria electronica",
    photo: "path/to/photo1.jpg",
    videos: [
      {
        description: "luz nocturna",
        url: "https://youtu.be/DAzKomKm_lY"
      },
      {
        description: "temporizador variable",
        url: "https://youtu.be/D077atedDa0"
      }
    ]
  },
  {
    name: "Estudiante 2",
    semester: 5,
    program: "Programa B",
    photo: "path/to/photo2.jpg",
    videos: [
      {
        description: "Video 1",
        url: "https://youtu.be/WZFpqKlr3c8"
      },
      {
        description: "Video 2",
        url: "https://www.youtube.com/embed/VIDEO_ID_4"
      }
    ]
  }
];

function filterGallery() {
  var filter = document.getElementById("search-input").value.toUpperCase();
  var studentBoxes = document.getElementsByClassName("student-box");

  for (var i = 0; i < studentBoxes.length; i++) {
    var studentBox = studentBoxes[i];
    var studentName = studentBox.getElementsByTagName("h2")[0].textContent.toUpperCase();

    if (studentName.includes(filter)) {
      studentBox.style.display = "block";
    } else {
      studentBox.style.display = "none";
    }
  }
}

function createViewVideosHandler(studentIndex) {
  return function () {
    var studentVideosSection = document.getElementById("student-videos-" + studentIndex);
    var studentVideos = students[studentIndex].videos;

    var allVideoSections = document.getElementsByClassName("student-video-section");
    for (var i = 0; i < allVideoSections.length; i++) {
      allVideoSections[i].style.display = "none";
    }

    studentVideosSection.style.display = "block";
    studentVideosSection.innerHTML = "";

    for (var j = 0; j < studentVideos.length; j++) {
      var video = studentVideos[j];

      var videoContainer = document.createElement("div");
      videoContainer.className = "video-container";

      var videoDescription = document.createElement("p");
      videoDescription.textContent = video.description;

      var videoElement = document.createElement("iframe");
      videoElement.src = video.url
      videoElement.width = "560";
      videoElement.height = "315";
      videoElement.allowfullscreen = true;

      videoContainer.appendChild(videoDescription);
      videoContainer.appendChild(videoElement);

      studentVideosSection.appendChild(videoContainer);
    }
  };
}

function createGallery() {
  var studentsContainer = document.getElementById("students-container");

  for (var i = 0; i < students.length; i++) {
    var student = students[i];

    var studentBox = document.createElement("div");
    studentBox.className = "student-box";

    var studentInfo = document.createElement("div");
    studentInfo.className = "student-info";

    var studentPhoto = document.createElement("img");
    studentPhoto.src = student.photo;
    studentInfo.appendChild(studentPhoto);

    var studentDetails = document.createElement("div");
    studentDetails.innerHTML = "<h2>" + student.name + "</h2>" +
      "<p>Semestre: " + student.semester + "</p>" +
      "<p>Programa: " + student.program + "</p>";
    studentInfo.appendChild(studentDetails);

    var viewVideosButton = document.createElement("button");
    viewVideosButton.textContent = "Ver Videos";
    viewVideosButton.className = "view-videos-button";
    viewVideosButton.addEventListener("click", createViewVideosHandler(i));

    studentBox.appendChild(studentInfo);
    studentBox.appendChild(viewVideosButton);

    var studentVideosSection = document.createElement("div");
    studentVideosSection.id = "student-videos-" + i;
    studentVideosSection.className = "student-video-section";

    studentBox.appendChild(studentVideosSection);

    studentsContainer.appendChild(studentBox);
  }
}

window.onload = function () {
  createGallery();

  var searchInput = document.getElementById("search-input");
  searchInput.addEventListener("keyup", filterGallery);
};

 
   
