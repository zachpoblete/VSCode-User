"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");

class mapper {

    static read_all_lines(file) {
        let text = fs.readFileSync(file, 'utf8');
        return text.split(/\r?\n/g);
    }

    static generate(file) {
        let members = [];
        try {
            let line_num = 0;
            let image_index = 1;
            mapper
                .read_all_lines(file)
                .forEach(line => {
                    line_num++;
                    line = line.trimStart();
                    if (/^\/\/=\s[^=]/.test(line))
                        members.push(`${line.substr(4)}|${line_num}|level1`);
                    else if (/^\/\/==\s[^=]/.test(line))
                        members.push(` ${line.substr(5)}|${line_num}|level2`);
                    else if (/^\/\/===\s[^=]/.test(line))
                        members.push(`  ${line.substr(6)}|${line_num}|level3`);
            });
        }
        catch (error) {
        }
        return members;
    }
}
exports.mapper = mapper;