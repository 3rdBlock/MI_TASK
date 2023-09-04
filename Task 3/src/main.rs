use std::mem;
use std::ptr::read_unaligned;

#[repr(C, packed)]
struct PacketHeader {
    device: u8,
    packet_length: u8,
    checksum: u32,
    data_address: u16,
    rw_command: u8,
}

fn main() {
    let data: Vec<u8> = vec![0x03, 0x03, 0xAA, 0xBB, 0xCC, 0xDD, 0x12, 0x34, 0x01, 0x78, 0x56, 0x78];

       if data.len() < mem::size_of::<PacketHeader>() {
        println!("Invalid packet: too short to contain a header");
        return;
    }

    let (header_bytes, payload_bytes) = data.split_at(mem::size_of::<PacketHeader>());

    let header_ptr: *const PacketHeader = header_bytes.as_ptr() as *const PacketHeader;

    
    match unsafe { (*header_ptr).device } {
        1 | 2 | 3 => {}, 
        _ => {
            println!("Invalid packet: unexpected device value");
            return;
        }
    }

    let packet_length = unsafe { (*header_ptr).packet_length } as usize;
    if packet_length != payload_bytes.len() {
        println!("Invalid packet: mismatched packet length");
        return;
    }

     match unsafe { (*header_ptr).device } {
        1 => println!("Device: Agito"),
        2 => println!("Device: Master"),
        3 => println!("Device: Hub"),
        _ => println!("Device: Unknown"),  // This condition should never be hit due to previous validation
    }

    println!("Packet Length: {}", packet_length);
    println!("Checksum (CRC): {:X}", unsafe { read_unaligned::<u32>(header_bytes.as_ptr().offset(2) as *const u32) });
    println!("Data Address: {:X}", unsafe { read_unaligned::<u16>(header_bytes.as_ptr().offset(6) as *const u16) });

    match unsafe { (*header_ptr).rw_command } {
        1 => println!("R/W Command: Read"),
        2 => println!("R/W Command: Write"),
        _ => println!("R/W Command: Unknown"),
    }

    println!("Payload Data: {:?}", payload_bytes);
}