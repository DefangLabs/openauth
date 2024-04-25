{ pkgs ? import <nixpkgs> { } }:
pkgs.mkShell {
  buildInputs = [
    pkgs.nixfmt
    pkgs.nodejs_20
    pkgs.pulumi-bin
    pkgs.hasura-cli
    pkgs.nodePackages.pnpm
  ];
}
