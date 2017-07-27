'use-strict';

import genreModule from '../genres/index';
import authorModule from '../authors/index';
import articleModule from '../articles/index'
import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost/indianhistory");

export default class Init {
    start(winston, router){

        genreModule(mongoose, winston, router);
        authorModule(mongoose, winston, router);
        articleModule(mongoose, winston, router);
    }
}