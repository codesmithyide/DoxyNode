#include "Polygon.h"
#include <vector>

/// This class represents a canvas on which geometric shapes can be drawn.
class Canvas
{
public:
    /// Adds a polygon to the canvas.
    /// @param p The polygon.
    void add(Polygon* p);

private:
    std::vector<Polygon*> m_polygons;
};
