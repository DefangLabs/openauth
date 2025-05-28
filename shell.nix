{ pkgs ? import <nixpkgs> { } }:
pkgs.mkShell {
  buildInputs = [
    pkgs.bun
    pkgs.nodejs_18 # same as Dockerfile
    pkgs.pulumi-bin
    pkgs.hasura-cli
    pkgs.nixfmt
    pkgs.stripe-cli
  ];
}