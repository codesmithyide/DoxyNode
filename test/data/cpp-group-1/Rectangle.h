#include "Polygon.h"

/// This class represents a rectangle.
/// \ingroup Shapes
class Rectangle : public Polygon
{
public:
    void draw() override;

    /// Gets the width of the rectangle.
    /// @return The width of the rectangle.
    int width() const;
    /// Gets the height of the rectangle.
    /// @return The height of the rectangle.
    int height() const;

    /// Sets the width of the rectangle.
    /// @param w The new width.
    void setWidth(int w);
    /// Sets the height of the rectangle.
    /// @param h The new height.
    void setHeight(int h);
};
