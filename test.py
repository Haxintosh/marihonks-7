import numpy as np
import matplotlib.pyplot as plt

# Define scene parameters
width = 400
height = 200
fov = np.pi / 2  # Field of view
aspect_ratio = width / height
camera_pos = np.array([0, 0, 0])  # Camera position
sphere_center = np.array([0, 0, 5])  # Sphere center
sphere_radius = 1  # Sphere radius
background_color = np.array([0, 0, 0])  # Background color

# Initialize image array
image = np.zeros((height, width, 3))

# Define ray-sphere intersection function
def intersect_ray_sphere(origin, direction, center, radius):
    oc = origin - center
    a = np.dot(direction, direction)
    b = 2.0 * np.dot(oc, direction)
    c = np.dot(oc, oc) - radius**2
    discriminant = b**2 - 4*a*c
    if discriminant < 0:
        return -1
    else:
        return (-b - np.sqrt(discriminant)) / (2*a)

# Ray tracing algorithm
for j in range(height):
    for i in range(width):
        x = (2*(i + 0.5)/width - 1) * np.tan(fov/2) * aspect_ratio
        y = (1 - 2*(j + 0.5)/height) * np.tan(fov/2)
        direction = np.array([x, y, -1])  # Ray direction
        direction /= np.linalg.norm(direction)  # Normalize direction vector

        t = intersect_ray_sphere(camera_pos, direction, sphere_center, sphere_radius)
        if t > 0:
            # Ray intersects sphere, calculate surface normal
            hit_point = camera_pos + t * direction
            normal = (hit_point - sphere_center) / sphere_radius
            color = 0.5 * (normal + 1)
        else:
            color = background_color
        
        image[j, i] = color

# Display rendered image
plt.imshow(image)
plt.axis('off')
plt.show()
