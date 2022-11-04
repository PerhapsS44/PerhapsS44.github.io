function draw_frame(state) {
    // console.log(state);
    let actors = state.actors;
    let logic_w = state.logic_w;
    let logic_h = state.logic_w;
    let stones = state.stones;
    let actors_colors = state.colors.slice(stones.length);
    let stones_colors = state.colors.slice(0, stones.length);

    draw_background();
    draw_actors(actors, actors_colors, logic_w, logic_h);
    draw_stones(stones, stones_colors, logic_w, logic_h);
}

function draw_background() {
    background(50);
}

function draw_actors(actors, colors, logic_w, logic_h) {
    // console.log(actors);
    actors.forEach((actor, i) => {
        // console.log(actor);

        // draw body
        {
            let body = actor[6];
            if (body.length > 1) {
                // debugger;
            }
            body.forEach((element, index) => {
                let logic_y = element[0];
                let logic_x = element[1];

                let x = map(logic_x, 0, logic_w, 0, width);
                let y = map(logic_y, 0, logic_h, 0, height);

                noStroke();
                fill(
                    colors[i][0],
                    colors[i][1],
                    colors[i][2],
                    map(index, 0, body.length, 0, 100)
                );
                ellipse(x, y, 15, 15);
            });
        }

        // draw head
        {
            let logic_y = actor[2];
            let logic_x = actor[3];
            let name_tag = actor[0];

            let x = map(logic_x, 0, logic_w, 0, width);
            let y = map(logic_y, 0, logic_h, 0, height);

            fill(colors[i][0], colors[i][1], colors[i][2]);
            ellipse(x, y, 20, 20);

            text(name_tag, x, y);
        }

        // noLoop();
    });
}

function draw_stones(stones, colors, logic_w, logic_h) {
    // console.log(stones);
    stones.forEach((stone, i) => {
        let logic_y = stone[0];
        let logic_x = stone[1];

        let x = map(logic_x, 0, logic_w, 0, width);
        let y = map(logic_y, 0, logic_h, 0, height);

        fill(colors[i][0], colors[i][1], colors[i][2]);
        ellipse(x, y, 20, 20);
    });
}
