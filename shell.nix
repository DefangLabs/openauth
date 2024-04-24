{ pkgs ? import <nixpkgs> { } }:
pkgs.mkShell {
  buildInputs = [
    pkgs.nixfmt
    pkgs.nodejs_20
    pkgs.pulumi-bin
  ];
}
