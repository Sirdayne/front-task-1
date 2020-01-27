const solution = function(graph, start, finish)  {
    const getStar = (value) => {
        return stars.find(star => star.name === value);
    };

    const setFirstStar = (value) => {
        let star = getStar(value);
        star.distance = 0;
        star.path = [start];
    };

    const getStarsFromGraph = (graph) => {
        const stars = [];
        Object.keys(graph).forEach(key => stars.push({
            name: key,
            distance: Infinity,
            path: []
       }));
       return stars;
    };

    setDistancePath = (toStar, fromStar, key, value) => {
        toStar.distance = fromStar.distance + value;
        toStar.path = [];
        fromStar.path.forEach(p => toStar.path.push(p));
        toStar.path.push(key);
    };

    const findStar = (point, newPoints) => {
        let fromStar = getStar(point);
        Object.entries(graph[point]).forEach(([key, value]) => {
            let toStar = getStar(key);
            if (fromStar.distance + value < toStar.distance) {
                setDistancePath(toStar, fromStar, key, value);
                newPoints.push(key);
            }
        });
        return newPoints;
    }

    const stars = getStarsFromGraph(graph);
    
    setFirstStar(start);

    let points = [start];

    while (getStar(finish).distance === Infinity) {
        let newPoints = []
        points.forEach(point => {
            newPoints = findStar(point, newPoints);
        });
        points = newPoints.slice();
    };
    
    return getStar(finish);
}
