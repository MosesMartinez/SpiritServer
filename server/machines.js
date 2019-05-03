let app = require('express')();
let bodyParser = require('body-parser');
let db = require('../db');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/:token', (req, res) => {
    const token = req.params.token;

    const query = `
    SELECT machine_id, machine_empty, machine_empty_time, machine_alcohol, machine_mixer, user_token
    FROM machines
    INNER JOIN users ON machine_user_id=user_id
    WHERE user_token='${token}'
    ORDER BY machine_id ASC;
    `;

    db.any(query)
        .then(result => {
            console.log("Got data");
            let machineData = []
            result.forEach(machine => {
                let singleMachine = {}
                singleMachine.id = machine.machine_id
                singleMachine.alcohol = [];
                singleMachine.mixer = [];

                for (let i = 0; i < 4; ++i) {
                    let emptyTime = machine.machine_empty_time[i];
                    if (machine.machine_empty[i] == false) emptyTime = null;
                    singleMachine.alcohol.push({
                        name: machine.machine_alcohol[i],
                        container: i,
                        empty: machine.machine_empty[i],
                        empty_time: emptyTime,
                    })

                    singleMachine.mixer.push({
                        name: machine.machine_mixer[i],
                        container: i,
                    });
                }
                machineData.push(singleMachine);
            });
            res.send(machineData);
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        })
});

app.post('/:machine', (req, res) => {
    const machine = req.params.machine;
    const a = JSON.parse(req.body.alcohol);
    const m = JSON.parse(req.body.mixer);

    console.log(a);
    console.log(m);

    const query = `
        UPDATE machines
        SET
            machine_alcohol=ARRAY['${a[0]}','${a[1]}','${a[2]}','${a[3]}'],
            machine_mixer=ARRAY['${m[0]}','${m[1]}','${m[2]}','${m[3]}']
	    WHERE machine_id=${machine};
    `;

    db.any(query)
        .then(result => {
            console.log(result);
            res.send('Updated machines');
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(404);
        })
});

app.listen(5002);