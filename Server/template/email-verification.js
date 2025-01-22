const otpTemplate = (otp) => {
    return `
    <html lang="en">

        <head>
            <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>

                    <style>
                        * {
                            padding: 0;
                        margin: 0;
                        box-sizing: border-box;
                        font-family: Arial, Helvetica, sans-serif;
        }

                        html {
                            font - size: 62.5%;
        }

                        .container {
                            padding - left: 10%;
                        padding-right: 10%;
                        text-align: center;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        min-height: 100vh;
                        row-gap: 2rem;
        }

                        .container p,
                        .container div {
                            font - size: 1.3rem;
                        max-width: 60%;
        }

                        .container div:nth-child(1) {
                            width: 50%;
        }

                        .container div h1 {
                            background - color: #f1c40f;
                        padding: .5rem .8rem;
        }

                        /* --------------------------------------- media query -------------------------------------- */
                        @media (width < 1200px) {

            .container p,
                        .container div {
                            max - width: 70%;
            }

                        .container div h1 {
                            font - size: 2rem;
            }
        }

                        @media (width < 768px) {

            .container p,
                        .container div {
                            max - width: 80%;
            }

                        .container p,
                        .container div {
                            font - size: 1.2rem;
            }

                        .container div h1 {
                            font - size: 1.6rem;
            }
        }

                        @media (width < 576px) {

            .container p,
                        .container div {
                            max - width: 100%;
            }

                        .container p,
                        .container div {
                            font - size: 1.2rem;
            }

                        .container div:nth-child(1) {
                            width: 90%;
        }

                        .container div h1 {
                            font - size: 1.4rem;
            }
        }
                    </style>

                </head>

                <body>
                    <div class="container">
                        <div>
                            <h1>Horizon General Hospital</h1>
                        </div>
                        <p>Dear User,</p>
                        <p>
                            Thank you for registering with Horizon General Hospital. To complete your registration, please use the
                            following OTP
                            (One-Time Password) to verify your account:
                        </p>
                        <h2>${otp}</h2>
                        <p>
                            This OTP is valid for 5 minutes. If you did not request this verification, please disregard this email.
                            Once your account is verified, you will have access to our platform and its features.
                        </p>
                        <div>
                            If you have any questions or need assistance, please feel free to reach out to us at
                            <a href="mailto:sarvajeetshahktn@gmail.com">
                                horizon@gmail.com
                            </a>
                            . We are here to help!
                        </div>
                    </div>
                </div>

            </body>

    </html>`
};

module.exports = otpTemplate;