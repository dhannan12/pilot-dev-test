"""
Password hashing utility using bcrypt.
Ensures secure password storage with minimum cost factor of 10.
"""
import bcrypt


class PasswordHasher:
    """Handles password hashing and verification using bcrypt"""
    
    # Minimum cost factor for bcrypt (2^10 rounds)
    MIN_COST_FACTOR = 10
    
    @staticmethod
    def hash_password(password: str, cost_factor: int = 12) -> str:
        """
        Hash a password using bcrypt.
        
        Args:
            password: Plain text password to hash
            cost_factor: Bcrypt cost factor (default 12, minimum 10)
        
        Returns:
            Hashed password as string
        """
        if cost_factor < PasswordHasher.MIN_COST_FACTOR:
            cost_factor = PasswordHasher.MIN_COST_FACTOR
        
        # Generate salt and hash password
        salt = bcrypt.gensalt(rounds=cost_factor)
        hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
        return hashed.decode('utf-8')
    
    @staticmethod
    def verify_password(plain_password: str, hashed_password: str) -> bool:
        """
        Verify a password against its hash.
        
        Args:
            plain_password: Plain text password to verify
            hashed_password: Stored bcrypt hash
        
        Returns:
            True if password matches, False otherwise
        """
        try:
            return bcrypt.checkpw(
                plain_password.encode('utf-8'),
                hashed_password.encode('utf-8')
            )
        except Exception:
            return False


# Module-level functions for convenience
def hash_password(password: str) -> str:
    """Hash a password with bcrypt (cost factor 12)"""
    return PasswordHasher.hash_password(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return PasswordHasher.verify_password(plain_password, hashed_password)
