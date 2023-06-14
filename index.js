// API Script

const searchButton = document.querySelector('.search-button');
const profileImage = document.querySelector('.profile-image');
const chosenName = document.querySelector('.name');
const username = document.querySelector('.username');
const bio = document.querySelector('.bio');
const statRepos = document.querySelector('.stat-repos');
const statFollowers = document.querySelector('.stat-followers');
const statFollowing = document.querySelector('.stat-following');
const userLocation = document.querySelector('.text-location');
const twitter = document.querySelector('.text-twitter');
const website = document.querySelector('.text-website');
const company = document.querySelector('.text-company');
let userInfo;
let searchedUser;

window.addEventListener('load', () => {
    searchButton.click();
})


searchButton.addEventListener("click", () => {
    searchedUser = document.querySelector('.search-bar').value;
    if (!searchedUser) {
        searchedUser = 'octocat';
    }
    axios.get(
        'https://api.github.com/users/' + searchedUser
    ).then(
        (res) => {
            userInfo = res.data;
            
            printInfo(userInfo);
        }
    ).catch(
        () => {
            document.querySelector('.error-msg').classList.remove('hidden');
        }
    );
});

function printInfo(userInfo) {

    profileImage.style.content = `url(${userInfo.avatar_url})`;

    // Logic for if the user has not set a name for their account
    if (userInfo.name) {
        chosenName.innerText = userInfo.name;
    } else if (userInfo.login.indexOf('@') != -1) {
        chosenName.innerText = userInfo.login.substring(1);
    } else {
        chosenName.innerText = userInfo.login;
    }

    if (userInfo.login.indexOf('@') == -1) {
        username.innerText = '@' + userInfo.login;
    } else {
        username.innerText = userInfo.login;
    }
    
    if (userInfo.bio) {
        bio.innerText = userInfo.bio;
    } else {
        bio.innerText = 'This profile has no bio';
        bio.style.opacity = '0.75';
    }

    if (userInfo.location) {
        userLocation.innerText = userInfo.location;
    } else {
        userLocation.innerText = 'Not available';
        userLocation.style.opacity = '0.5';
    }

    if (userInfo.twitter_username) {
        let twitterLink = document.createElement('a');
        twitterLink.href = "https://twitter.com/" + userInfo.twitter_username;
        twitterLink.textContent = userInfo.twitter_username;
        twitter.append(twitterLink);
    } else {
        twitter.innerText = 'Not available';
        twitter.style.opacity = '0.5';
    }

    if (userInfo.blog) {
        let websiteLink = document.createElement('a');
        websiteLink.href = userInfo.blog;
        websiteLink.textContent = userInfo.blog;
        website.append(websiteLink);
    } else {
        website.innerText = 'Not available';
        website.style.opacity = '0.5';
    }

    if (userInfo.company) {
        let companyLink = document.createElement('a');
        companyLink.href = "https://github.com/" + userInfo.company.substring(1);
        companyLink.textContent = userInfo.company;
        company.append(companyLink)
    } else {
        company.innerText = 'Not available';
        company.style.opacity = '0.5';
    }
    
    statRepos.innerText = userInfo.public_repos;
    statFollowers.innerText = userInfo.followers;
    statFollowing.innerText = userInfo.following;
}

document.querySelector('.search-bar').addEventListener('focus', () => {
    document.querySelector('.error-msg').classList.add('hidden');
})


// Theme Toggler Script

document.addEventListener('DOMContentLoaded', () => {
    const lightMode = document.querySelector('.light');
    const darkMode = document.querySelector('.dark');
    const root = document.documentElement;

    lightMode.style.display = 'none';

    lightMode.addEventListener('click', () => {
        root.setAttribute('theme', 'light');
        localStorage.setItem('theme', 'light');
        lightMode.style.display = 'none';
        darkMode.style.display = 'inline-block';
    });

    darkMode.addEventListener('click', () => {
        root.setAttribute('theme', 'dark');
        localStorage.setItem('theme', 'dark');
        lightMode.style.display = 'inline-block';
        darkMode.style.display = 'none';
    });
})
