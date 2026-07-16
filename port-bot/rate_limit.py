from datetime import datetime, timedelta, timezone
from config import supabase

WINDOW_HOURS = 24

def is_allowed(ip: str, limit: int) -> tuple[bool, int]:
    result = supabase.table("rate_limits").select("*").eq("ip", ip).execute()
    
    now = datetime.now(timezone.utc)
    
    if not result.data:
        supabase.table("rate_limits").insert(
            {"ip": ip, "request_count": 1, "window_start": now.isoformat()}
        ).execute()
        return True, limit - 1
    
    row = result.data[0]
    window_start = datetime.fromisoformat(row["window_start"])
    
    if now - window_start > timedelta(hours=WINDOW_HOURS):
        supabase.table("rate_limits").update(
            {"request_count": 1, "window_start": now.isoformat()}
        ).eq("ip", ip).execute()
        return True, limit - 1
    
    if row["request_count"] >= limit:
        return False, 0
    
    new_count = row["request_count"] + 1
    supabase.table("rate_limits").update({"request_count": new_count}).eq(
        "ip", ip
    ).execute()
    return True, limit - new_count