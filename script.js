// content is the variable containg the area which is to be changed on clicking the specific buttons
let content = document.getElementById("main-item-2");

// home page
home.addEventListener(
  "click",
  (homePage = () => {
    location.reload();
  })
);

// login page
login.addEventListener(
  "click",
  (loginPage = () => {
    login.style.color = "white";
    login.style.backgroundColor = "rgb(215, 3, 3)";
    home.style.color = "black";
    content.style.display = "none";
    loginContent.style.display = "block";
    registerContent.style.display = "none";
    helpContent.style.display = "none";
    register.style.color = "rgb(215, 3, 3)";
    register.style.backgroundColor = "rgb(234, 233, 233)";
    Route.style.display = "none";
    help.style.color = "black";
    document.title = "DTC bus routing | Login";
  })
);
// registration page
register.addEventListener(
  "click",
  (registerPage = () => {
    register.style.color = "white";
    register.style.backgroundColor = "rgb(215, 3, 3)";
    home.style.color = "black";
    content.style.display = "none";
    registerContent.style.display = "block";
    loginContent.style.display = "none";
    helpContent.style.display = "none";
    login.style.color = "rgb(215, 3, 3)";
    login.style.backgroundColor = "rgb(234, 233, 233)";
    Route.style.display = "none";
    help.style.color = "black";
    document.title = "DTC bus routing | Registration";
  })
);
// not a member on login page to be directed to registration page
notamember.addEventListener(
  "click",
  (registerPage = () => {
    register.style.color = "white";
    register.style.backgroundColor = "rgb(215, 3, 3)";
    home.style.color = "black";
    content.style.display = "none";
    registerContent.style.display = "block";
    loginContent.style.display = "none";
    helpContent.style.display = "none";
    login.style.color = "rgb(215, 3, 3)";
    login.style.backgroundColor = "rgb(234, 233, 233)";
    Route.style.display = "none";
    help.style.color = "black";
    document.title = "DTC bus routing | Registration";
  })
);
// help and contact
help.addEventListener(
  "click",
  (registerPage = () => {
    helpContent.style.display = "block";
    help.style.color = "rgb(215, 3, 3)";
    register.style.color = "rgb(215, 3, 3)";
    register.style.backgroundColor = "rgb(234, 233, 233)";
    home.style.color = "black";
    content.style.display = "none";
    registerContent.style.display = "none";
    loginContent.style.display = "none";
    login.style.color = "rgb(215, 3, 3)";
    login.style.backgroundColor = "rgb(234, 233, 233)";
    Route.style.display = "none";
    document.title = "DTC bus routing | Help & Contact";
  })
);

//dijkstra algorithm
let findShortestPath = (graph, startNode, endNode) => {
  // track distances from the start node using a hash object
  let distances = {};
  distances[endNode] = "Infinity";
  distances = Object.assign(distances, graph[startNode]);
  // track paths using a hash object
  let parents = { endNode: null };
  for (let child in graph[startNode]) {
    parents[child] = startNode;
  }

  // collect visited nodes
  let visited = [];
  // find the nearest node
  let node = shortestDistanceNode(distances, visited);

  // for that node:
  while (node) {
    // find its distance from the start node & its child nodes
    let distance = distances[node];
    let children = graph[node];

    // for each of those child nodes:
    for (let child in children) {
      // make sure each child node is not the start node
      if (String(child) === String(startNode)) {
        continue;
      } else {
        // save the distance from the start node to the child node
        let newdistance = distance + children[child];
        // if there's no recorded distance from the start node to the child node in the distances object
        // or if the recorded distance is shorter than the previously stored distance from the start node to the child node
        if (!distances[child] || distances[child] > newdistance) {
          // save the distance to the object
          distances[child] = newdistance;
          // record the path
          parents[child] = node;
        }
      }
    }
    // move the current node to the visited set
    visited.push(node);
    // move to the nearest neighbor node
    node = shortestDistanceNode(distances, visited);
  }

  // using the stored paths from start node to end node
  // record the shortest path
  let shortestPath = [endNode];
  let parent = parents[endNode];
  while (parent) {
    shortestPath.push(parent);
    parent = parents[parent];
  }
  shortestPath.reverse();

  //this is the shortest path
  let results = {
    distance: distances[endNode],
    path: shortestPath,
  };
  // return the shortest path & the end node's distance from the start node
  return results;
};
let shortestDistanceNode = (distances, visited) => {
  // create a default value for shortest
  let shortest = null;

  // for each node in the distances object
  for (let node in distances) {
    // if no node has been assigned to shortest yet
    // or if the current node's distance is smaller than the current shortest
    let currentIsShortest =
      shortest === null || distances[node] < distances[shortest];

    // and if the current node is in the unvisited set
    if (currentIsShortest && !visited.includes(node)) {
      // update shortest to be the current node
      shortest = node;
    }
  }
  return shortest;
};

let graph = {
  Pitampura: { "Subhash Palace": 5, "Nehru Place": 2 },
  "Subhash Palace": {
    Pitampura: 5,
    "Kashmere Gate": 4,
    "Uttam Nagar": 2,
    "Nehru Place": 8,
  },
  "Nehru Place": { "Subhash Palace": 8, "Uttam Nagar": 7, Pitampura: 2 },
  "Kashmere Gate": {
    "Uttam Nagar": 6,
    "Sarai Kale Khan": 3,
    "Subhash Palace": 4,
  },
  "Uttam Nagar": {
    "Sarai Kale Khan": 1,
    "Subhash Palace": 2,
    "Nehru Place": 7,
    "Kashmere Gate": 6,
  },
  "Sarai Kale Khan": { "Kashmere Gate": 3, "Uttam Nagar": 1 },
};

// console.log(findShortestPath(graph, "Pitampura", 'Sarai Kale Khan'));

// console.log(findShortestPath(graph, 'Subhash Palace','Nehru Place'));

// console.log(findShortestPath(graph, 'Subhash Palace', "Pitampura"));
var route_details;
function update() {
  var from = document.getElementById("from");
  var option1 = from.options[from.selectedIndex];
  var to = document.getElementById("to");
  var option2 = to.options[to.selectedIndex];
  route_details = findShortestPath(graph, option1.text, option2.text);
  console.log(route_details);
}
update();
// show button
showRoute.addEventListener(
  "click",
  (showrun = () => {
    if (route_details.distance == "Infinity") {
      Route.innerHTML = `<br> Invalid Details  <br> <a style=text-decoration:underline;color:blue; href=''>Go to Home page</a> `;
    } else {
      route_details.path.forEach((element) => {
        RouteDetails.innerHTML += element;
        RouteDetails.innerHTML += " -> ";
      });
      let fare = "";
      if (route_details.distance <= 4) {
        fare = "Rs. 5";
      } else if (route_details.distance > 4 && route_details.distance <= 10) {
        fare = "Rs. 10";
      } else {
        fare = "Rs. 15";
      }
      RouteDetails.innerText = RouteDetails.innerText.slice(0, -3);
      RouteDetails.innerHTML += `<br> <br> Distance: ${route_details.distance} Km <br> Fare: ${fare} `;
    }
    Route.style.display = "block";
    content.style.display = "none";
  })
);




