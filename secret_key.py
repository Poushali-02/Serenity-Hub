import secrets
import os

# Generate a 32-byte random secret key
secret_key = secrets.token_hex(32)

# Check if SECRET_KEY already exists in .env
if os.path.exists(".env"):
    with open(".env", "r") as env_file:
        lines = env_file.readlines()
        for line in lines:
            if line.startswith("SECRET_KEY="):
                print("✅ SECRET_KEY already exists in .env")
                break
        else:
            # Append SECRET_KEY if not found
            with open(".env", "a") as env_file:
                env_file.write(f"\nSECRET_KEY={secret_key}\n")
            print("✅ Secret key appended to .env successfully!")
else:
    # Create .env file if it doesn't exist
    with open(".env", "w") as env_file:
        env_file.write(f"SECRET_KEY={secret_key}\n")
    print("✅ .env file created with a new secret key!")
