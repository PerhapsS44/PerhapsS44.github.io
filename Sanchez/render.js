function draw_frame(state) {
    // console.log(state);
    let actors = state.actors;
    let logic_w = state.logic_w;
    let logic_h = state.logic_w;
    let stones = state.stones;
    let actors_colors = state.colors.slice(2);
    let stones_color = state.colors[1];
    let background_color = state.colors[0];

    let sq_w_size = width / logic_w;
    let sq_h_size = height / logic_h;
    // print(sq_w_size, sq_h_size);
    draw_background(background_color);
    draw_actors(actors, actors_colors, logic_w, logic_h, sq_w_size, sq_h_size);
    draw_stones(stones, stones_color, logic_w, logic_h, sq_w_size, sq_h_size);
}

function draw_background(color) {
    // background(color);
    background(50);
}

function draw_actors(actors, colors, logic_w, logic_h, sq_w_size, sq_h_size) {
    // console.log(actors);
    actors.forEach((actor, i) => {
        // console.log(actor);
        if (actor[1] === "snake") {
            draw_snake(
                actor,
                colors[i],
                logic_w,
                logic_h,
                sq_w_size,
                sq_h_size
            );
        }

        if (actor[1] === "hedgehog") {
            draw_hedgehog(
                actor,
                colors[i],
                logic_w,
                logic_h,
                sq_w_size,
                sq_h_size
            );
        }
        // noLoop();
    });
}

function draw_snake(data, color, logic_w, logic_h, sq_w_size, sq_h_size) {
    // draw body
    {
        let body = data[6];
        if (body.length > 1) {
            // debugger;
        }
        body.forEach((element, index) => {
            let logic_y = element[0];
            let logic_x = element[1];

            fill(
                color[0],
                color[1],
                color[2],
                map(index, 0, body.length, 0, 100)
            );
            noStroke();
            rect(
                logic_x * sq_w_size,
                logic_y * sq_h_size,
                sq_w_size,
                sq_h_size
            );
        });
    }

    // draw head
    {
        let logic_y = data[2];
        let logic_x = data[3];
        let name_tag = data[0];

        fill(color[0], color[1], color[2]);
        noStroke();
        rect(logic_x * sq_w_size, logic_y * sq_h_size, sq_w_size, sq_h_size);

        text(name_tag, (logic_x + 1) * sq_w_size, logic_y * sq_h_size);
    }
}

function draw_hedgehog(data, color, logic_w, logic_h, sq_w_size, sq_h_size) {
    // draw head
    {
        let logic_y = data[2];
        let logic_x = data[3];
        let name_tag = data[0];

        fill(color[0], color[1], color[2]);
        noStroke();
        rect(logic_x * sq_w_size, logic_y * sq_h_size, sq_w_size, sq_h_size);

        text(name_tag, (logic_x + 1) * sq_w_size, logic_y * sq_h_size);
    }
}

function draw_stones(stones, color, logic_w, logic_h, sq_w_size, sq_h_size) {
    // console.log(stones);
    stones.forEach((stone) => {
        let logic_y = stone[0];
        let logic_x = stone[1];

        fill(color[0], color[1], color[2]);
        noStroke();
        rect(logic_x * sq_w_size, logic_y * sq_h_size, sq_w_size, sq_h_size);
    });
}
