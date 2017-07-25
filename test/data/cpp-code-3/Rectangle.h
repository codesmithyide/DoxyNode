#include "Polygon.h"

/// This class represents a rectangle.
class Rectangle : public Polygon
{
public:
    void draw() override;

    /// Gets the width of the rectangle.
    /// @returns The width of the rectangle.
    int width() const;
    /// Gets the height of the rectangle.
    /// @returns The height of the rectangle.
    int height() const;

    /// Sets the width of the rectangle.
    /// @param w The new width.
    void setWidth(int w);
    /// Sets the height of the rectangle.
    /// @param w The new height.
    void setHeight(int h);
};
