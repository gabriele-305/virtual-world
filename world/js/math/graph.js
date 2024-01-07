class Graph {
    constructor(points = [], segments = []) {
        this.points = points
        this.segments = segments
    }

    static load(info) {
        const points = info.points.map(i => new Point(i.x, i.y))
        const segments = info.segments.map(i => new Segment(
            points.find(p => p.equals(i.p1)),
            points.find(p => p.equals(i.p2))
        ))
        return new Graph(points, segments)
    }

    hash() {
        return JSON.stringify(this)
    }

    addPoint(point) {
        this.points.push(point)
    }

    tryAddPoint(point) {
        if (!this.containsPoint(point)) {
            this.addPoint(point)
            return true
        }
        return false
    }

    containsPoint(point) {
        return this.points.find(p => p.equals(point))
    }

    removePoint(p) {
        const segs = this.getSegmentsWithPoint(p)
        for (const seg of segs) {
            this.removeSegment(seg)
        }
        this.points.splice(this.points.indexOf(p), 1)
    }

    tryAddSegment(seg) {
        if (!this.containsSegment(seg) && !seg.p1.equals(seg.p2)) {
            this.addSegment(seg)
            return true
        }
        return false
    }

    containsSegment(seg) {
        return this.segments.find(s => s.equals(seg))
    }

    addSegment(seg) {
        this.segments.push(seg)
    }

    removeSegment(seg) {
        this.segments.splice(this.segments.indexOf(seg), 1)
    }

    getSegmentsWithPoint(p) {
        const segs = []
        for (const seg of this.segments) {
            if (seg.includes(p))
                segs.push(seg)
        }
        return segs
    }

    dispose() {
        this.points.length = 0
        this.segments.length = 0
    }

    draw(ctx) {
        for (const seg of this.segments) {
            seg.draw(ctx)
        }

        for (const p of this.points) {
            p.draw(ctx)
        }
    }
}