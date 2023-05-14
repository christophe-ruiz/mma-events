export class Organization {
  url: string;
  logo: string;
  location: string;
  description: string;
  website: string;
  twitter: string;
  facebook: string;
  instagram: string;
  youtube: string;
  created_at: string;
  updated_at: string;
  id: string;

  constructor(
    url: string,
    logo: string,
    location: string,
    description: string,
    website: string,
    twitter: string,
    facebook: string,
    instagram: string,
    youtube: string,
    created_at: string,
    updated_at: string,
    id: string,
  ) {
    this.url = url;
    this.logo = logo;
    this.location = location;
    this.description = description;
    this.website = website;
    this.twitter = twitter;
    this.facebook = facebook;
    this.instagram = instagram;
    this.youtube = youtube;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.id = id;
  }

  static create(
    url: string,
    logo: string,
    location: string,
    description: string,
    website: string,
    twitter: string,
    facebook: string,
    instagram: string,
    youtube: string,
  ) {
    return new Organization(
      url,
      logo,
      location,
      description,
      website,
      twitter,
      facebook,
      instagram,
      youtube,
      Date.now().toString(),
      Date.now().toString(),
      Math.random().toString(),
    );
  }
}
