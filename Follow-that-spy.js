/*
We are diligently pursuing our elusive operative, Matthew Knight, 
who also goes by the alias Roy Miller. 

He employs a nomadic lifestyle to evade detection, 
constantly moving from one location to another, 
with each of his journeys following a perplexing 
and non-standard sequence of itineraries. 

Our mission is to decipher the routes he will undertake during each of his voyages.

Task:
  You've been provided with an array of itinerary routes, 
  decipher the precise destinations he will visit in the 
  correct sequence according to his meticulously planned itineraries.

Example:
  Based on the provided routes:
  [ [USA, BRA], [JPN, PHL], [BRA, UAE], [UAE, JPN] ]
  The correct sequence of destinations is:
  "USA, BRA, UAE, JPN, PHL"

Note:
  You can safely assume that there will be no duplicate locations with distinct routes.
  All routes provided will have non-empty itineraries.
  There will always be at least one (1) route connecting one waypoint to another.
*/


// Solution

const findRoutes = routes => {
  let routeMap = {}

  for([from,to] of routes) routeMap[from] = to
  
  for([curr] of routes){
    const arr = [ curr ]
    
    while(curr in routeMap){
      arr.push(routeMap[curr])
      curr = routeMap[curr]
    }
    
    if(arr.length === routes.length + 1) return arr.join(', ')
  }
}

// or

function findRoutes(routes) {
  const { sourcesMap, destinationsMap } = createRoutesMaps(routes);
  const startingPoint = findStartingPoint(sourcesMap, routes);
  const agentRoute = simulateRouteFrom(startingPoint, destinationsMap);

  return agentRoute.join(', ');
}

function simulateRouteFrom(startingPoint, destinationsMap) {
  const routes = [startingPoint];
  let destination = startingPoint;

  while (destination) {
    destination = destinationsMap.get(destination);

    if (destination) {
      routes.push(destination);
    }
  }

  return routes;
}

function findStartingPoint(sourcesMap, routes) {
  for (const [source] of routes) {
    if (!sourcesMap.has(source)) {
      return source;
    }
  }
}

function createRoutesMaps(routes) {
  const sourcesMap = new Map();
  const destinationsMap = new Map();

  routes.forEach(route => {
    const [source, destination] = route;

    sourcesMap.set(destination, source);
    destinationsMap.set(source, destination);
  });

  return { sourcesMap, destinationsMap };
}