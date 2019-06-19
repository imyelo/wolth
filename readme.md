# wolth
> :zzz: Wake on LAN through HTTP

## Get Started
1. Clone the project to the server machine

    ```bash
    $ git clone https://github.com/imyelo/wolth.git
    ```

2. Install dependencies

    ```bash
    $ cd wolth
    $ yarn
    ```

3. Start server, the `WOLTH_MAC` is the MAC address of the machine you want to wake but not the server's

    ```bash
    $ WOLTH_MAC="12:34:56:78:9a:bc" npm start
    ```

    or set environment variables in `.env` file:

    ```bash
    $ echo "WOLTH_MAC = 12:34:56:78:9a:bc" > .env
    $ npm start
    ```

4. Wake from machine

    ```bash
    $ curl -X POST http://127.0.0.1:3000
    ```

You can now wake the machine from anywhere with a simple POST request as long as the server is acceptable from outside. :tada:

## Configuration
Environment variables:
- `WOLTH_MAC`:
  - required
  - the MAC address of the machine you want to wake
- `WOLTH_ADDRESS`:
  - optional, default value is `'255.255.255.255'`
- `WOLTH_PORT`:
  - optional, default value is `9`

## Configuration Example
Minimal config in `.env` file:
```ini
WOLTH_MAC = 12:34:56:67:9a:bc
```

Full config: in `.env` file
```ini
# .env
WOLTH_MAC = 12:34:56:67:9a:bc
WOLTH_ADDRESS = 192.168.1.10
WOLTH_PORT = 7
```

## License
Apache-2.0 &copy; [yelo](https://github.com/imyelo), 2019 - present
