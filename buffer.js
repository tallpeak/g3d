function fillBuffer(c, buffer, values, dt, tt) {
    fillAnyBuffer(c, c.ARRAY_BUFFER, buffer, values, dt, tt);
}

function fillElementBuffer(c, buffer, values, dt, tt) {
    fillAnyBuffer(c, c.ELEMENT_ARRAY_BUFFER, buffer, values, dt, tt);
}

function fillAnyBuffer(c, buffer_type, buffer, values, dt, tt) {
    c.bindBuffer(buffer_type, buffer);
    c.bufferData(buffer_type, new dt(values), tt || c.STATIC_DRAW);
}

function inferElementType(dt) {
    var t;
    var n;
    if (dt == Float32Array) {
        t = gl.FLOAT;
        n = false;
    } else if (dt == Uint8Array) {
        t = gl.UNSIGNED_BYTE;
        n = true;
    } else if (dt == Int8Array) {
        t = gl.BYTE;
        n = true;
    } else if (dt == Uint16Array) {
        t = gl.UNSIGNED_SHORT;
        n = true;
    } else if (dt == Int16Array) {
        t = gl.SHORT;
        n = true;
    } else {
        throw("unhandled type:" + (dt));
    }
    return t;
}

function G3Buffer(c, name, dt, values, isize) {
    this.name = name;
    this.buffer = c.createBuffer();
    this.buffer_type = c.ARRAY_BUFFER;
    this.element_type = inferElementType(dt);

    this.isize = isize;
    this.length = values.length / isize;

    c.bindBuffer(this.buffer_type, this.buffer);
    c.bufferData(this.buffer_type, new dt(values), c.STATIC_DRAW);
}

function G3ElementBuffer(c, dt, values, isize) {
    isize = isize || 1;
    this.buffer = c.createBuffer();
    this.buffer_type = c.ELEMENT_ARRAY_BUFFER;
    this.element_type = inferElementType(dt);

    this.isize = isize;
    this.length = values.length / isize;

    c.bindBuffer(this.buffer_type, this.buffer);
    c.bufferData(this.buffer_type, new dt(values), c.STATIC_DRAW);
}