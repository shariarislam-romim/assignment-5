let allIssues = [];

const cardContainer = document.getElementById("cardContainer");


const totalCount = document.getElementById("totalCount");


const assignee = document.getElementById("assignee");
const priority = document.getElementById("priority");
const author = document.getElementById("author");
const date = document.getElementById("date");
const searchBtn = document.getElementById("searchBtn");


const createElements = (arr) => {
  const htmlElements = arr.map((el) => {
    const style =
      el === "bug"
        ? {
            color: "bg-[#FEECEC] border-[#FECACA] text-[#EF4444]",
            icon: "./assets/BugDroid.png",
          }
        : el === "help wanted"
          ? {
              color: "bg-[#FFF8DB] border-[#FDE68A] text-[#D97706]",
              icon: "./assets/Lifebuoy.png",
            }
          : el === "enhancement"
            ? {
                color: "bg-[#DEFCE8] border-[#BBF7D0] text-[#00A96E]",
                icon: "./assets/Sparkle.png",
              }
            : el === "good first issue"
              ? {
                  color: "bg-[#b1faca] border-[#8bb59a] text-[#25a14e]",
                  icon: "./assets/Sparkle.png",
                }
              : {
                  color: "bg-[#c3f6f7] border-[#71bebf] text-[#0e9496]",
                  icon: "./assets/document.svg",
                };
    return `<div
                class="${style.color} h-6 text-center flex rounded-2xl border "
              >
                <h1
                  class="text-xs flex justify-center items-center gap-1 px-3 whitespace-nowrap"
                >
                  <img src="${style.icon}" alt="">${el.toUpperCase()}
                </h1>
              </div>`;
  });
  return htmlElements.join(" ");
};

const manageSpinner = (status) => {
   
    

  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("cardContainer").classList.add("hidden");
  } else {
    document.getElementById("cardContainer").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

async function loadIssues() {
  manageSpinner(true);
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  const res = await fetch(url);
  const data = await res.json();

  allIssues = data.data;
  displayIssues(allIssues);
  displayCount(allIssues);
};

// filter button
const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");
const btns = document.querySelectorAll("#btnDiv button");

const setActive = (btn) => {
  btns.forEach((btn) => {
    btn.classList.add("btn-outline");
    btn.classList.remove("btn-primary");
  });
  btn.classList.add("btn-primary");
  btn.classList.remove("btn-outline");
};

allBtn.addEventListener("click", () => {
  setActive(allBtn);
  displayCount(allIssues);
  displayIssues(allIssues);
});

openBtn.addEventListener("click", () => {
  setActive(openBtn);
  const openIssues = allIssues.filter((issue) => issue.status === "open");
  displayCount(openIssues);
  displayIssues(openIssues);
});

closedBtn.addEventListener("click", () => {
  setActive(closedBtn);
  const closedIssues = allIssues.filter((issue) => issue.status === "closed");
  displayCount(closedIssues);
  displayIssues(closedIssues);
});

const displayIssues = (issues) => {

  cardContainer.innerHTML = "";
   cardContainer.classList.add("grid");

  issues.forEach((issue) => {
    const color =
      issue.priority === "high"
        ? "bg-[#FEECEC] text-[#EF4444]"
        : issue.priority === "medium"
          ? "bg-[#FFF6D1] text-[#F59E0B]"
          : "bg-[#EEEFF2] text-[#9CA3AF]";
    const card = document.createElement("div");
    card.className = `bg-white rounded-lg shadow-sm border-t-3 ${issue.status === "open" ? "border-[#00A96E]" : "border-[#A855F7]"}`;
    card.innerHTML = `
        <div onclick="openIssueModal(${issue.id})" class="">
          <div class="space-y-3 p-4">
            <div class="flex justify-between">
              <img src="./assets/Open-Status.png" alt="" />
              <div class="${color} w-20 h-6 text-center rounded-2xl">
                <h1 class="">${issue.priority.toUpperCase()}</h1>
              </div>
            </div>
            <div class="space-y-2">
              <h1 class="text-sm font-semibold">
                ${issue.title}
              </h1>
              <p class="line-clamp-2 text-xs">
                ${issue.description.split(" ").slice(0, 9).join(" ") + "..."}
              </p>
            </div>
            <div>
              <div
                class="flex gap-2 flex-wrap"
              >
                ${createElements(issue.labels)}
                </div>
              </div>
            </div>
          </div>
          <div class="text-[#64748B] text-xs p-4 border-t border-[#E4E4E7]">
            <h1>${issue.author}</h1>
            <h1>${issue.updatedAt.slice(0, 10)}</h1>
          </div>
        </div>
    `;

    cardContainer.appendChild(card);
  });
   manageSpinner(false);
};
loadIssues();
const loadIssueDetails = async (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  console.log(details);
};

async function openIssueModal(id) {
  manageSpinner(true);
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  const issueDetails = details.data;

    const issueModal = document.getElementById("issueModal");
    const title = document.getElementById("title");
    const status = document.getElementById("status");
    const label = document.getElementById("labels");
    const description = document.getElementById("description");
  
  title.textContent = issueDetails.title;
  status.textContent = issueDetails.status === "open" ? "Opened" : "Closed";
  status.style.backgroundColor =
    issueDetails.status === "open" ? "#00A96E" : "#A855F7";

  label.innerHTML = `<div
                class="flex gap-2 flex-wrap"
              >
                ${createElements(issueDetails.labels)}
                </div>`;
  description.textContent = issueDetails.description;
  assignee.textContent = issueDetails.assignee;
  author.textContent = issueDetails.author;
  
  date.textContent = new Date(issueDetails.createdAt).toLocaleDateString(
    "en-GB",
  );
  priority.textContent = issueDetails.priority.toUpperCase();
  priority.classList.remove("bg-[#EF4444]", "bg-[#F59E0B]", "bg-[#9CA3AF]");
  priority.classList.add(
    issueDetails.priority === "high"
      ? "bg-[#EF4444]"
      : issueDetails.priority === "medium"
        ? "bg-[#F59E0B]"
        : "bg-[#9CA3AF]",
  );
  manageSpinner(false);
  issueModal.showModal();
}

searchBtn.addEventListener("click", async () => {
  const searchInput = document.getElementById("searchInput");
  const searchValue = searchInput.value.trim().toLowerCase();

  manageSpinner(true);
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`,
  );
  const data = await res.json();
  const issues = data.data;

  if (issues.length === 0) {
    cardContainer.classList.remove("grid");
    cardContainer.innerHTML = `
            <div class="grid grid-cols-1 text-center">
                <p class="text-[#64748B] font-semibold text-2xl mt-12 text-center ">No Issues Found</p>
            </div>
        `;
    displayCount(issues);
    
  } else {
    displayIssues(issues);
    displayCount(issues);
  }

  manageSpinner(false);
  btns.forEach((btn) => {
    btn.classList.add("btn-outline");
    btn.classList.remove("btn-primary");
  });
});

const displayCount = (issues) => {
  totalCount.innerHTML = `
        <h1 class="text-xl font-semibold">${issues.length} Issues</h1>
  `;
  console.log();
};