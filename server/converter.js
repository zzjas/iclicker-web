const convertExcel = require('excel-as-json').processFile;

class Converter {
    constructor(firestore) {
        this.studentsRef = firestore.collection('students');
        this.categoriesRef = firestore.collection('categories');
    }

    convertStudentsFromExcel(path) {
        convertExcel(path, undefined, {
            isColOriented: true,
        }, (err, data) => {
            if(err) console.log(err);
            else {
                let students = {};

                for(let i = 0; i < data.length; i++) {
                    for(let id in data[i]) {
                        let studentId = id.toString().replace('#', '');

                        if(students[studentId] === undefined) {
                            students[studentId] = {};
                        }

                        students[studentId][i] = data[i][id].charCodeAt(0) - "A".charCodeAt(0);
                    }
                }

                for(let id in students) {
                    this.studentsRef.doc(id).set(students[id]);
                }
            }
        });
    }
}

module.exports = Converter;
