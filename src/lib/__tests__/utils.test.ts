import { describe, expect, it } from "vitest";
import { cn, formatIDR, slugify, stockStatus, clamp } from "@/lib/utils";
import { getStoreStatus } from "@/lib/store-hours";

describe("cn", () => {
  it("joins truthy classes", () => {
    expect(cn("a", "b", false, null, undefined, "c")).toBe("a b c");
  });
});

describe("formatIDR", () => {
  it("formats rupiah with separators", () => {
    expect(formatIDR(249000)).toContain("249.000");
  });
  it("formats zero", () => {
    expect(formatIDR(0)).toContain("0");
  });
});

describe("slugify", () => {
  it("lowercases and kebab-cases", () => {
    expect(slugify("Graphic Tee 01!")).toBe("graphic-tee-01");
  });
});

describe("stockStatus", () => {
  it("returns OUT OF STOCK for zero", () => {
    expect(stockStatus(0)).toBe("OUT OF STOCK");
  });
  it("returns LOW STOCK for low counts", () => {
    expect(stockStatus(3)).toBe("LOW STOCK");
  });
  it("returns IN STOCK otherwise", () => {
    expect(stockStatus(20)).toBe("IN STOCK");
  });
});

describe("clamp", () => {
  it("clamps values", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-3, 0, 10)).toBe(0);
    expect(clamp(99, 0, 10)).toBe(10);
  });
});

describe("getStoreStatus", () => {
  // Friday 14:00 Jakarta = 07:00 UTC
  it("reports OPEN on Friday afternoon Jakarta time", () => {
    const friday = new Date("2026-08-14T07:00:00Z"); // Fri 14:00 WIB
    const status = getStoreStatus(friday);
    expect(status.open).toBe(true);
    expect(status.label).toBe("OPEN NOW");
  });

  // Friday 08:00 Jakarta = 01:00 UTC (before 13:00 opening)
  it("reports CLOSED Friday morning before 13:00", () => {
    const fridayMorning = new Date("2026-08-14T01:00:00Z"); // Fri 08:00 WIB
    const status = getStoreStatus(fridayMorning);
    expect(status.open).toBe(false);
    expect(status.message).toContain("13:00");
  });

  // Monday 22:00 Jakarta = 15:00 UTC (after 21:00 close)
  it("reports CLOSED after 21:00", () => {
    const mondayNight = new Date("2026-08-10T15:00:00Z"); // Mon 22:00 WIB
    const status = getStoreStatus(mondayNight);
    expect(status.open).toBe(false);
  });

  // Monday 12:00 Jakarta = 05:00 UTC
  it("reports OPEN on a normal weekday midday", () => {
    const monday = new Date("2026-08-10T05:00:00Z"); // Mon 12:00 WIB
    const status = getStoreStatus(monday);
    expect(status.open).toBe(true);
  });
});
