export const handleLogin = (e, role, email, password) => {
    e.preventDefault()
    try {
        if( !role || !email || !password)
        {
            alert('please prvoide all fields')
        }
        console.log('login', e, role, email, password);
    }
    catch (error) {
        console.log('error');
    }

}
export const handleRegister = (e,
    role,
    email,
    website,
    name,
    address,
    phone,
    password,
    organisationName,
    hospitalName) => {
    e.preventDefault()
    try {
        console.log('register',e,
            role,
            email,
            website,
            name,
            address,
            phone,
            password,
            organisationName,
            hospitalName)

    }
    catch(error)
    {
        console.log('error');
    }

}

