function skillsMember() {
  var member = document.getElementById("member");
  var memberSkills = document.getElementById("memberSkills");
  var memberSkillsButton = document.getElementById("memberSkillsButton");

  if (memberSkills.style.display === "none") {
    memberSkills.style.display = "block";
    memberSkillsButton.innerHTML = "Hide";
    member.innerHTML = "Hide Skills";
  } else {
    memberSkills.style.display = "none";
    memberSkillsButton.innerHTML = "Show";
    member.innerHTML = "Show Skills";
  }
}