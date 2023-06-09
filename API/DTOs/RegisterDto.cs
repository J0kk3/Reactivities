using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string DisplayName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z]=(?=.*[A-Z]).{4,8}$", ErrorMessage = "Password must be a combination of uppercase, lowercase, and numbers")]
        public string Password { get; set; }
    }
}