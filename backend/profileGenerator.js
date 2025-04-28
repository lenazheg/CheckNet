const mockGenerateProfile = (name, email, keywords, wiki) => {
  return new Promise((resolve, reject) => {
    console.log("Mock profile generation started...");
    setTimeout(() => {
      const profileSummary = `${name} is a skilled individual with expertise in ${keywords}. They have a proven track record of success, demonstrated by their experience and strong leadership in various projects. With an email of ${email}, they are always looking to take on new challenges.`;
      resolve(profileSummary);
    }, 2000);
  });
};

export { mockGenerateProfile };
